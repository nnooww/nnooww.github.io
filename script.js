/* ============================
   ELS 리스크 체크랩 — script.js
   ============================ */

/* ---- 1. 체험형 시뮬레이터 (투자 게임) ---- */
(function initSimulator() {
  var INIT_ASSET  = 10000; // 만 원 단위, 1억 = 10000만
  var WIN_ASSET   = 30000; // 3억
  var MIN_BET     = 1000;   // 1000만
  var BUST_UNDER  = 2000;   // 2000만 미만 시 파산

  // 시장 결과 정의 [아이콘, 제목, 결과 설명, 배율, 요약]
  var MARKET = {
    good: {
      icon:    '🟢',
      title:   '조기상환 성공!',
      outcome: '기초자산 가격이 조기상환 조건을 충족했습니다. 선택한 투자 금액에 가정 수익률 8%가 적용되어 상환됩니다.',
      rate:    0.08,
      summary: '✅ ELS 조건을 만족해 수익을 받았습니다. 실제로는 상품마다 수익률이 다릅니다.'
    },
    mid: {
      icon:    '🟡',
      title:   '조기상환 실패 — 다음 라운드로 이월',
      outcome: '기초자산 가격이 조기상환 기준에 미달했습니다. 이번 라운드 수익은 없고, 선택한 투자 금액은 다음 평가일까지 묶입니다.',
      rate:    0,
      summary: '⚠️ 수익도 손실도 없지만, 자산이 묶인 상태입니다. 이 상황이 반복되면 만기까지 기다려야 할 수 있습니다.'
    },
    bad: {
      icon:    '🔴',
      title:   '큰 하락 발생 — 손실 상황',
      outcome: '기초자산 가격이 손실 구간까지 급락한 상황을 가정했습니다. 선택한 투자 금액의 40%가 손실됩니다. 실제 ELS는 낙인 발생 여부와 만기 평가가격 등 상품 조건에 따라 손실 여부와 규모가 달라집니다.',
      rate:    -0.40,
      summary: '🚨 원금 손실이 발생했습니다. 높은 수익률만 보고 가입하면 이런 상황을 맞을 수 있습니다.'
    }
  };

  var asset    = INIT_ASSET;
  var round    = 1;
  var betAmt   = 0;

  var assetEl    = document.getElementById('simAsset');
  var roundEl    = document.getElementById('simRound');
  var betArea    = document.getElementById('simBetArea');
  var marketArea = document.getElementById('simMarketArea');
  var resultBox  = document.getElementById('simResultBox');
  var endBox     = document.getElementById('simEndBox');
  var betBtns    = document.querySelectorAll('.btn-sim-bet');
  var goBtn      = document.getElementById('simGoBtn');
  var nextBtn    = document.getElementById('simNextBtn');
  var restartBtn = document.getElementById('simRestartBtn');
  var iconEl     = document.getElementById('simIcon');
  var titleEl    = document.getElementById('simTitle');
  var outEl      = document.getElementById('simOutcome');
  var changeEl   = document.getElementById('simChange');
  var sumEl      = document.getElementById('simSummary');
  var endIcon    = document.getElementById('simEndIcon');
  var endTitle   = document.getElementById('simEndTitle');
  var endMsg     = document.getElementById('simEndMsg');

  if (!betArea) return;

  function fmt(n) {
    if (n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, '') + '억 원';
    return n.toLocaleString() + '만 원';
  }

  function updateStatus() {
    if (assetEl) assetEl.textContent = fmt(asset);
    if (roundEl) roundEl.textContent = round;
  }

  function showBet() {
    betArea.hidden    = false;
    marketArea.hidden = true;
    resultBox.hidden  = true;
    betBtns.forEach(function (btn) {
      var b = btn.getAttribute('data-bet');
      var amt = b === 'all' ? asset : parseInt(b, 10);
      btn.disabled = asset < MIN_BET || (b !== 'all' && amt > asset);
    });
  }

  function showEnd(win) {
    betArea.hidden    = true;
    marketArea.hidden = true;
    resultBox.hidden  = true;
    endBox.hidden     = false;
    if (win) {
      endIcon.textContent  = '🏆';
      endTitle.textContent = '투자 성공! 3억 원 달성';
      endMsg.textContent   = '축하합니다! 목표 금액인 3억 원을 달성하셨습니다. 하지만 실제 ELS에서는 이 과정에서 운과 조건이 모두 작용했습니다. 항상 손실 조건을 먼저 확인하는 습관이 중요합니다.';
    } else {
      endIcon.textContent  = '💸';
      endTitle.textContent = '자산 기준 미달 — 체험 종료';
      endMsg.textContent   = '자산이 2,000만 원 미만으로 떨어져 체험을 중단합니다. ELS는 원금 보장 상품이 아닙니다. 높은 수익률 뒤에는 이런 손실 가능성이 있습니다.';
    }
  }

  betBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var b = btn.getAttribute('data-bet');
      betAmt = b === 'all' ? asset : parseInt(b, 10);
      betArea.hidden    = true;
      marketArea.hidden = false;
    });
  });

  function rollMarket() {
    var r = Math.floor(Math.random() * 100);
    if (r < 40) return 'good';   // 40%
    if (r < 75) return 'mid';    // 35%
    return 'bad';                 // 25%
  }

  function applyResult(m) {
    var data   = MARKET[m];
    var change = Math.round(betAmt * data.rate);
    asset     += change;

    if (iconEl)   iconEl.textContent   = data.icon;
    if (titleEl)  titleEl.textContent  = data.title;
    if (outEl)    outEl.textContent    = data.outcome;
    if (changeEl) {
      var sign = change > 0 ? '+' : '';
      changeEl.textContent = (change < 0 ? '-' : sign) + fmt(Math.abs(change)) + (change === 0 ? ' (변화 없음)' : change > 0 ? ' 증가' : ' 손실');
    }
    if (sumEl) sumEl.textContent = data.summary;

    marketArea.hidden = true;
    resultBox.hidden  = false;
    updateStatus();

    if (asset < BUST_UNDER) {
      asset = 0;
      updateStatus();
      nextBtn.hidden = true;
      setTimeout(function () { showEnd(false); }, 1200);
    } else if (asset >= WIN_ASSET) {
      nextBtn.hidden = true;
      setTimeout(function () { showEnd(true); }, 1200);
    } else {
      nextBtn.hidden = false;
    }
  }

  if (goBtn) {
    goBtn.addEventListener('click', function () {
      applyResult(rollMarket());
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      round++;
      resultBox.hidden = true;
      updateStatus();
      showBet();
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', function () {
      asset = INIT_ASSET;
      round = 1;
      endBox.hidden = true;
      updateStatus();
      showBet();
    });
  }

  updateStatus();
  showBet();
})();



/* ---- 2. AI 설명 검증 미션 ---- */
(function initMissions() {
  var cards = document.querySelectorAll('.mission-card');
  var total = cards.length;
  if (!total) return;

  var answered = 0;
  var correct = 0;
  var answeredEl = document.getElementById('missionAnswered');
  var correctEl = document.getElementById('missionCorrect');
  var resultBox = document.getElementById('missionResult');
  var resultText = document.getElementById('missionResultText');
  var retryBtn = document.getElementById('missionRetryBtn');

  var feedback = {
    risk: '문제 있음 — 금융 설명은 수익률만 강조하거나 원금 보장처럼 오해시켜서는 안 됩니다. 공식 출처와 상품 조건으로 다시 검증해야 합니다.',
    safe: '문제 없음 — 수익 가능성과 원금 손실 가능성을 함께 설명하고 있어 투자자가 조건을 확인하도록 돕는 표현입니다.'
  };

  function updateStatus() {
    if (answeredEl) answeredEl.textContent = answered;
    if (correctEl) correctEl.textContent = correct;

    if (answered === total && resultBox) {
      resultBox.hidden = false;
      if (resultText) {
        if (correct === total) {
          resultText.textContent = '모든 문장을 정확히 검증했습니다. 금융상품 설명은 공식 출처와 상품 조건을 기준으로 다시 확인해야 합니다.';
        } else {
          resultText.textContent = '일부 문장을 다시 확인해야 합니다. 안전하다, 무조건, 손실 조건 생략 같은 표현은 금융상품 설명에서 특히 위험합니다.';
        }
      }
    }
  }

  cards.forEach(function (card) {
    var answer = card.getAttribute('data-answer');
    var buttons = card.querySelectorAll('.btn-mission');
    var feedbackEl = card.querySelector('.mission-feedback');
    var done = false;

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        if (done) return;
        done = true;
        answered++;

        var choice = button.getAttribute('data-choice');
        var isCorrect = choice === answer;
        if (isCorrect) correct++;

        buttons.forEach(function (btn) {
          btn.disabled = true;
          if (btn.getAttribute('data-choice') === answer) {
            btn.classList.add('correct-choice');
          }
        });

        if (!isCorrect) {
          button.classList.add('wrong-choice');
        }

        if (feedbackEl) {
          feedbackEl.textContent = (isCorrect ? '✅ ' : '❌ ') + feedback[answer];
          feedbackEl.className = 'mission-feedback ' + (isCorrect ? 'correct' : 'wrong');
        }

        updateStatus();
      });
    });
  });

  if (retryBtn) {
    retryBtn.addEventListener('click', function () {
      window.location.reload();
    });
  }

  updateStatus();
})();

/* ---- 3. OX 퀴즈 + 학습 결과 ---- */
(function initQuiz() {
  var TOTAL = 6;

  var explanations = [
    ['X',
      '정답 X — ELS는 금융투자상품이므로 예금자보호 대상 예금이 아닙니다.',
      '틀렸습니다. ELS는 예금이 아니라 금융투자상품이므로 예금자보호 대상 예금이 아닙니다.'],
    ['O',
      '정답 O — 기초자산 가격과 손실 조건에 따라 원금 손실이 발생할 수 있습니다.',
      '틀렸습니다. ELS는 상품 조건에 따라 원금 손실이 발생할 수 있는 금융투자상품입니다.'],
    ['X',
      '정답 X — 높은 수익률보다 손실 조건과 기초자산을 먼저 확인하셔야 합니다.',
      '틀렸습니다. 높은 수익률보다 손실 조건과 기초자산을 먼저 확인하셔야 합니다.'],
    ['O',
      '정답 O — ELS의 수익과 손실은 주식, 주가지수 등 기초자산의 움직임과 관련될 수 있습니다.',
      '틀렸습니다. ELS의 수익과 손실은 기초자산 가격 움직임과 관련됩니다.'],
    ['O',
      '정답 O — ELS는 조건이 중요한 상품이므로 상품 설명서의 손실 조건을 반드시 확인하셔야 합니다.',
      '틀렸습니다. ELS는 손실 조건을 반드시 확인해야 하는 상품입니다.'],
    ['X',
      '정답 X — 조기상환이 되지 않으면 만기까지 위험이 이어질 수 있고, 조건에 따라 손실 가능성도 있습니다.',
      '틀렸습니다. 조기상환이 안 되면 만기까지 위험이 계속될 수 있으며, 손실 가능성도 있습니다.']
  ];

  var grades = {
    s: {
      grade:    '학습 결과: 우수 — ELS 핵심 이해 완료',
      icon:     '🏆',
      cssClass: 'grade-s',
      body:     'ELS의 핵심 구조를 정확히 파악하셨습니다. ELS는 조건을 만족하면 수익을 받을 수 있지만, 조건을 벗어나면 <strong>원금 손실이 발생할 수 있는 금융투자상품</strong>입니다. 앞으로도 기초자산·조기상환 조건·손실 조건·만기 조건·예금자보호 여부를 먼저 확인하시는 태도를 유지해 주세요.'
    },
    b: {
      grade:    '학습 결과: 양호 — 일부 내용 재확인 필요',
      icon:     '📋',
      cssClass: 'grade-b',
      body:     '절반 이상의 내용을 올바르게 이해하셨습니다. 그러나 놓친 부분이 있습니다. 틀린 문항의 해설을 다시 검토해 주세요. ELS는 원금 보장 상품이 아니며, <strong>높은 수익률보다 손실 조건을 먼저 확인</strong>하셔야 합니다.'
    },
    f: {
      grade:    '학습 결과: 보충 필요 — 기본 개념 재학습 권장',
      icon:     '🔄',
      cssClass: 'grade-f',
      body:     'ELS의 핵심 개념에 대한 이해가 부족합니다. ELS는 예금이 아니라 <strong>금융투자상품</strong>이며, 조건에 따라 원금 손실이 발생할 수 있습니다. 위로 스크롤하셔서 기본 개념과 수익/손실 섹션을 다시 검토해 주세요.'
    }
  };

  var answered      = new Array(TOTAL).fill(false);
  var correctCount  = 0;
  var answeredCount = 0;

  var answeredEl   = document.getElementById('quizAnswered');
  var progressFill = document.getElementById('quizProgressFill');
  var progressBar  = document.getElementById('quizProgressBar');
  var confirmBtn   = document.getElementById('verdictBtn');
  var resultBox    = document.getElementById('verdictBox');
  var retryBtn     = document.getElementById('retryBtn');
  var cards        = document.querySelectorAll('.quiz-card');

  function updateProgress() {
    if (answeredEl)   answeredEl.textContent = answeredCount;
    var pct = Math.round((answeredCount / TOTAL) * 100);
    if (progressFill) progressFill.style.width = pct + '%';
    if (progressBar)  progressBar.setAttribute('aria-valuenow', answeredCount);

    if (confirmBtn) {
      if (answeredCount === TOTAL) {
        confirmBtn.disabled = false;
        confirmBtn.setAttribute('aria-disabled', 'false');
        confirmBtn.textContent = '학습 결과 확인하기 →';
      } else {
        confirmBtn.disabled = true;
        confirmBtn.setAttribute('aria-disabled', 'true');
        confirmBtn.textContent = '학습 결과 확인하기 (' + (TOTAL - answeredCount) + '문항 남음)';
      }
    }
  }

  cards.forEach(function (card) {
    var idx      = parseInt(card.getAttribute('data-index'), 10);
    var answer   = card.getAttribute('data-answer');
    var btns     = card.querySelectorAll('.btn-ox');
    var resultEl = card.querySelector('.quiz-result');
    var info     = explanations[idx];

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (answered[idx]) return;
        answered[idx] = true;
        answeredCount++;

        var chosen    = btn.classList.contains('btn-o') ? 'O' : 'X';
        var isCorrect = chosen === answer;

        if (isCorrect) {
          correctCount++;
          btn.classList.add('selected-correct');
          resultEl.textContent = '✅ ' + info[1];
          resultEl.className   = 'quiz-result correct';
        } else {
          btn.classList.add('selected-wrong');
          resultEl.textContent = '❌ ' + info[2];
          resultEl.className   = 'quiz-result wrong';
        }

        btns.forEach(function (b) {
          b.disabled = true;
          b.setAttribute('aria-disabled', 'true');
          if (!b.classList.contains('selected-correct') && !b.classList.contains('selected-wrong')) {
            var bChoice = b.classList.contains('btn-o') ? 'O' : 'X';
            if (bChoice === answer) {
              b.style.borderColor = 'var(--color-success)';
              b.style.color       = 'var(--color-success)';
            }
          }
        });

        updateProgress();
      });
    });
  });

  if (confirmBtn) {
    confirmBtn.addEventListener('click', function () {
      if (confirmBtn.disabled) return;

      var data = correctCount === 6 ? grades.s : correctCount >= 3 ? grades.b : grades.f;

      var iconEl  = document.getElementById('verdictIcon');
      var gradeEl = document.getElementById('verdictGrade');
      var scoreEl = document.getElementById('verdictScoreLine');
      var bodyEl  = document.getElementById('verdictBody');

      if (iconEl)  iconEl.textContent  = data.icon;
      if (gradeEl) gradeEl.textContent = data.grade;
      if (scoreEl) scoreEl.textContent = '정답 수: ' + correctCount + ' / ' + TOTAL + '문항';
      if (bodyEl)  bodyEl.innerHTML    = data.body;

      resultBox.hidden    = false;
      resultBox.className = 'result-box ' + data.cssClass;
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  if (retryBtn) {
    retryBtn.addEventListener('click', function () {
      answered      = new Array(TOTAL).fill(false);
      correctCount  = 0;
      answeredCount = 0;

      cards.forEach(function (card) {
        var btns     = card.querySelectorAll('.btn-ox');
        var resultEl = card.querySelector('.quiz-result');
        btns.forEach(function (btn) {
          btn.disabled = false;
          btn.setAttribute('aria-disabled', 'false');
          btn.classList.remove('selected-correct', 'selected-wrong');
          btn.style.borderColor = '';
          btn.style.color       = '';
        });
        resultEl.textContent = '';
        resultEl.className   = 'quiz-result';
      });

      resultBox.hidden    = true;
      resultBox.className = 'result-box';
      updateProgress();
      document.getElementById('section-quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  updateProgress();
})();
