const SPRITE_PATH = "assets/sprites/";

const sprites = {
  player: {
    idle: `${SPRITE_PATH}player-idle-transparent.png`,
    attack: `${SPRITE_PATH}player-attack-transparent.png`,
    down1: `${SPRITE_PATH}player-down1-transparent.png`,
    down2: `${SPRITE_PATH}player-down2-transparent.png`
  },
  slime: {
    idle: `${SPRITE_PATH}slime-idle-transparent.png`,
    attack: `${SPRITE_PATH}slime-attack-transparent.png`,
    down1: `${SPRITE_PATH}slime-down1-transparent.png`,
    down2: `${SPRITE_PATH}slime-down2-transparent.png`
  },
  bat: {
    idle: `${SPRITE_PATH}bat-idle-transparent.png`,
    attack: `${SPRITE_PATH}bat-attack-transparent.png`,
    down1: `${SPRITE_PATH}bat-down1-transparent.png`,
    down2: `${SPRITE_PATH}bat-down2-transparent.png`
  },
  goblin: {
    idle: `${SPRITE_PATH}goblin-idle-transparent.png`,
    attack: `${SPRITE_PATH}goblin-attack-transparent.png`,
    down1: `${SPRITE_PATH}goblin-down1-transparent.png`,
    down2: `${SPRITE_PATH}goblin-down2-transparent.png`
  },
  wolf: {
    idle: `${SPRITE_PATH}wolf-idle-transparent.png`,
    attack: `${SPRITE_PATH}wolf-attack-transparent.png`,
    down1: `${SPRITE_PATH}wolf-down1-transparent.png`,
    down2: `${SPRITE_PATH}wolf-down2-transparent.png`
  },
  orc: {
    idle: `${SPRITE_PATH}orc-idle-transparent.png`,
    attack: `${SPRITE_PATH}orc-attack-transparent.png`,
    down1: `${SPRITE_PATH}orc-down1-transparent.png`,
    down2: `${SPRITE_PATH}orc-down2-transparent.png`
  },
  kingSlime: {
    idle: `${SPRITE_PATH}king-slime-idle-transparent.png`,
    attack: `${SPRITE_PATH}king-slime-attack-transparent.png`,
    down1: `${SPRITE_PATH}king-slime-down1-transparent.png`,
    down2: `${SPRITE_PATH}king-slime-down2-transparent.png`
  },
  skeleton: {
    idle: `${SPRITE_PATH}skeleton-idle-transparent.png`,
    attack: `${SPRITE_PATH}skeleton-attack-transparent.png`,
    down1: `${SPRITE_PATH}skeleton-down1-transparent.png`,
    down2: `${SPRITE_PATH}skeleton-down2-transparent.png`
  },
  magmaSlime: {
    idle: `${SPRITE_PATH}magma-slime-idle-transparent.png`,
    attack: `${SPRITE_PATH}magma-slime-attack-transparent.png`,
    down1: `${SPRITE_PATH}magma-slime-down1-transparent.png`,
    down2: `${SPRITE_PATH}magma-slime-down2-transparent.png`
  },
  magmaGolem: {
    idle: `${SPRITE_PATH}magma-golem-idle-transparent.png`,
    attack: `${SPRITE_PATH}magma-golem-attack-transparent.png`,
    down1: `${SPRITE_PATH}magma-golem-down1-transparent.png`,
    down2: `${SPRITE_PATH}magma-golem-down2-transparent.png`
  },
  hellhound: {
    idle: `${SPRITE_PATH}hellhound-idle-transparent.png`,
    attack: `${SPRITE_PATH}hellhound-attack-transparent.png`,
    down1: `${SPRITE_PATH}hellhound-down1-transparent.png`,
    down2: `${SPRITE_PATH}hellhound-down2-transparent.png`
  },
  fireSalamander: {
    idle: `${SPRITE_PATH}fire-salamander-idle-transparent.png`,
    attack: `${SPRITE_PATH}fire-salamander-attack-transparent.png`,
    down1: `${SPRITE_PATH}fire-salamander-down1-transparent.png`,
    down2: `${SPRITE_PATH}fire-salamander-down2-transparent.png`
  },
  dullahan: {
    idle: `${SPRITE_PATH}dullahan-idle.png`,
    attack: `${SPRITE_PATH}dullahan-attack.png`,
    down1: `${SPRITE_PATH}dullahan-down1.png`,
    down2: `${SPRITE_PATH}dullahan-down2.png`
  },
  wraith: {
    idle: `${SPRITE_PATH}wraith-idle.png`,
    attack: `${SPRITE_PATH}wraith-attack.png`,
    down1: `${SPRITE_PATH}wraith-down1.png`,
    down2: `${SPRITE_PATH}wraith-down2.png`
  },
  necromancer: {
    idle: `${SPRITE_PATH}necromancer-idle.png`,
    attack: `${SPRITE_PATH}necromancer-attack.png`,
    down1: `${SPRITE_PATH}necromancer-down1.png`,
    down2: `${SPRITE_PATH}necromancer-down2.png`
  },
  deathGuardian: {
    idle: `${SPRITE_PATH}death-guardian-idle.png`,
    attack: `${SPRITE_PATH}death-guardian-attack.png`,
    down1: `${SPRITE_PATH}death-guardian-down1.png`,
    down2: `${SPRITE_PATH}death-guardian-down2.png`
  },
  fallenPriest: {
    idle: `${SPRITE_PATH}fallen-priest-idle.png`,
    attack: `${SPRITE_PATH}fallen-priest-attack.png`,
    down1: `${SPRITE_PATH}fallen-priest-down1.png`,
    down2: `${SPRITE_PATH}fallen-priest-down2.png`
  },
  deathReaper: {
    idle: `${SPRITE_PATH}death-reaper-idle.png`,
    attack: `${SPRITE_PATH}death-reaper-attack.png`,
    down1: `${SPRITE_PATH}death-reaper-down1.png`,
    down2: `${SPRITE_PATH}death-reaper-down2.png`
  },
  lich: {
    idle: `${SPRITE_PATH}lich-idle.png`,
    attack: `${SPRITE_PATH}lich-attack.png`,
    down1: `${SPRITE_PATH}lich-down1.png`,
    down2: `${SPRITE_PATH}lich-down2.png`
  },
  cursedKnight: {
    idle: `${SPRITE_PATH}cursed-knight-idle.png`,
    attack: `${SPRITE_PATH}cursed-knight-attack.png`,
    down1: `${SPRITE_PATH}cursed-knight-down1.png`,
    down2: `${SPRITE_PATH}cursed-knight-down2.png`
  },
  creepingHand: {
    idle: `${SPRITE_PATH}creeping-hand-idle.png`,
    attack: `${SPRITE_PATH}creeping-hand-attack.png`,
    down1: `${SPRITE_PATH}creeping-hand-down1.png`,
    down2: `${SPRITE_PATH}creeping-hand-down2.png`
  },
  obsidianKnight: {
    idle: `${SPRITE_PATH}obsidian-knight-idle-transparent.png`,
    attack: `${SPRITE_PATH}obsidian-knight-attack-transparent.png`,
    down1: `${SPRITE_PATH}obsidian-knight-down1-transparent.png`,
    down2: `${SPRITE_PATH}obsidian-knight-down2-transparent.png`
  },
  emberMoth: {
    idle: `${SPRITE_PATH}ember-moth-idle-transparent.png`,
    attack: `${SPRITE_PATH}ember-moth-attack-transparent.png`,
    down1: `${SPRITE_PATH}ember-moth-down1-transparent.png`,
    down2: `${SPRITE_PATH}ember-moth-down2-transparent.png`
  },
  magmaScorpion: {
    idle: `${SPRITE_PATH}magma-scorpion-idle-transparent.png`,
    attack: `${SPRITE_PATH}magma-scorpion-attack-transparent.png`,
    down1: `${SPRITE_PATH}magma-scorpion-down1-transparent.png`,
    down2: `${SPRITE_PATH}magma-scorpion-down2-transparent.png`
  }
};

const stageMonsterData = [
  [
    { id: "goblin", name: "\uace0\ube14\ub9b0", hp: 40, maxHp: 40, attack: 8, sprite: "goblin", chapter: 1 },
    { id: "bat", name: "\ubc15\uc950", hp: 25, maxHp: 25, attack: 7, sprite: "bat", chapter: 1 },
    { id: "slime", name: "\uc2ac\ub77c\uc784", hp: 30, maxHp: 30, attack: 5, sprite: "slime", chapter: 1 }
  ],
  [
    { id: "wolf", name: "\ub291\ub300", hp: 45, maxHp: 45, attack: 9, sprite: "wolf", ability: "lifeSteal", chapter: 1 },
    { id: "orc", name: "\uc624\ud06c", hp: 60, maxHp: 60, attack: 11, sprite: "orc", chapter: 1 },
    { id: "goblin", name: "\uace0\ube14\ub9b0", hp: 40, maxHp: 40, attack: 8, sprite: "goblin", chapter: 1 }
  ],
  [
    { id: "skeleton", name: "\uc2a4\ucf08\ub808\ud1a4", hp: 40, maxHp: 40, attack: 5, baseAttack: 5, focusBonus: 0, sprite: "skeleton", ability: "focusAttack", chapter: 1 },
    { id: "kingSlime", name: "\ud0b9 \uc2ac\ub77c\uc784", hp: 70, maxHp: 70, attack: 8, sprite: "kingSlime", ability: "split", boss: true, chapter: 1 },
    { id: "orc", name: "\uc624\ud06c", hp: 60, maxHp: 60, attack: 11, sprite: "orc", chapter: 1 }
  ],
  [
    { id: "magmaSlime", name: "\ub9c8\uadf8\ub9c8 \uc2ac\ub77c\uc784", hp: 38, maxHp: 38, attack: 7, sprite: "magmaSlime", ability: "burnSlime", chapter: 2 },
    { id: "magmaScorpion", name: "\ub9c8\uadf8\ub9c8 \uc804\uac08", hp: 44, maxHp: 44, attack: 8, sprite: "magmaScorpion", ability: "scorpionBurn", chapter: 2 },
    { id: "emberMoth", name: "\uc7bf\ubd88 \ub098\ubc29", hp: 32, maxHp: 32, attack: 7, sprite: "emberMoth", ability: "ashPowder", chapter: 2 }
  ],
  [
    { id: "hellhound", name: "\ud654\uc5fc \ud5ec\ud558\uc6b4\ub4dc", hp: 58, maxHp: 58, attack: 10, sprite: "hellhound", ability: "doubleAttack", chapter: 2 },
    { id: "obsidianKnight", name: "\ud751\uc694\uc11d \uae30\uc0ac", hp: 62, maxHp: 62, attack: 9, sprite: "obsidianKnight", ability: "obsidianArmor", chapter: 2 },
    { id: "magmaGolem", name: "\ub9c8\uadf8\ub9c8 \uace8\ub818", hp: 78, maxHp: 78, attack: 8, baseAttack: 8, overheatCount: 0, sprite: "magmaGolem", ability: "overheat", chapter: 2 }
  ],
  [
    { id: "fireSalamander", name: "\ud654\uc5fc \uc0d0\ub7ec\ub9e8\ub354", hp: 90, maxHp: 90, attack: 11, sprite: "fireSalamander", ability: "lavaBlood", boss: true, chapter: 2 },
    { id: "magmaGolem", name: "\ub9c8\uadf8\ub9c8 \uace8\ub818", hp: 82, maxHp: 82, attack: 8, baseAttack: 8, overheatCount: 0, sprite: "magmaGolem", ability: "overheat", chapter: 2 },
    { id: "magmaScorpion", name: "\ub9c8\uadf8\ub9c8 \uc804\uac08", hp: 48, maxHp: 48, attack: 8, sprite: "magmaScorpion", ability: "scorpionBurn", chapter: 2 }
  ],
  [
    { id: "creepingHand", name: "크리핑 핸드", hp: 60, maxHp: 60, attack: 14, sprite: "creepingHand", ability: "weakeningGrip", chapter: 3 },
    { id: "wraith", name: "망령", hp: 90, maxHp: 90, attack: 16, sprite: "wraith", ability: "phantomDodge", chapter: 3 },
    { id: "necromancer", name: "네크로맨서", hp: 80, maxHp: 80, attack: 12, sprite: "necromancer", ability: "deathCommand", chapter: 3 }
  ],
  [
    { id: "dullahan", name: "듀라한", hp: 95, maxHp: 95, attack: 20, baseAttack: 20, sprite: "dullahan", ability: "berserk", chapter: 3 },
    { id: "cursedKnight", name: "저주받은 기사", hp: 110, maxHp: 110, attack: 18, sprite: "cursedKnight", ability: "cursedArmor", chapter: 3 },
    { id: "fallenPriest", name: "타락한 사제", hp: 75, maxHp: 75, attack: 10, sprite: "fallenPriest", ability: "darkBlessing", chapter: 3 }
  ],
  [
    { id: "deathReaper", name: "데스 리퍼", hp: 110, maxHp: 110, attack: 20, sprite: "deathReaper", ability: "deathSentence", chapter: 3 },
    { id: "lich", name: "리치", hp: 180, maxHp: 180, attack: 25, sprite: "lich", ability: "undyingRitual", boss: true, revived: false, chapter: 3 },
    { id: "deathGuardian", name: "데스 가디언", hp: 130, maxHp: 130, attack: 10, sprite: "deathGuardian", ability: "immortalWall", chapter: 3 }
  ]ㄴ
];

const chapters = [
  { number: 1, title: "1\ucc55\ud130", implemented: true },
  { number: 2, title: "2\ucc55\ud130", implemented: true },
  { number: 3, title: "3\ucc55\ud130", implemented: true }
];

const monsterInfo = {
  goblin: { name: "\uace0\ube14\ub9b0", chapter: 1, sprite: "goblin", traitName: "\ud2b9\uc131 \uc5c6\uc74c", traitDescription: "\ud2b9\uc131\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.", story: "버려진 갱도와 폐허 주변에서 자주 발견되는 하급 마물입니다. 약하지만 무리를 이루면 지나가는 모험가에게 큰 위협이 됩니다." },
  bat: { name: "\ubc15\uc950", chapter: 1, sprite: "bat", traitName: "\ud2b9\uc131 \uc5c6\uc74c", traitDescription: "\ud2b9\uc131\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.", story: "동굴 천장과 무너진 성벽 틈에 숨어 사는 야행성 마물입니다. 어둠 속에서 날개 소리만 남긴 채 접근해 사냥감을 혼란스럽게 만듭니다." },
  slime: { name: "\uc2ac\ub77c\uc784", chapter: 1, sprite: "slime", traitName: "\ud2b9\uc131 \uc5c6\uc74c", traitDescription: "\ud2b9\uc131\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.", story: "습기 찬 지하와 오래된 배수로에서 생겨나는 점액형 마물입니다. 단순한 움직임을 보이지만 끈질기게 달라붙어 방심한 상대를 지치게 합니다." },
  wolf: { name: "\ub291\ub300", chapter: 1, sprite: "wolf", traitName: "\ud53c\ud761", traitDescription: "\uacf5\uaca9 \uc2dc \uc785\ud78c \ud53c\ud574\uc758 50%\ub9cc\ud07c HP\ub97c \ud68c\ubcf5\ud569\ub2c8\ub2e4.", story: "폐허의 마력에 오랫동안 노출되어 흉성이 강해진 늑대입니다. 상처를 입힐수록 더 집요해지며, 사냥감의 생기를 빨아들여 버팁니다." },
  orc: { name: "\uc624\ud06c", chapter: 1, sprite: "orc", traitName: "\ud2b9\uc131 \uc5c6\uc74c", traitDescription: "\ud2b9\uc131\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.", story: "거친 힘과 단순한 전투 본능으로 폐허의 길목을 차지한 마물입니다. 정교한 전술은 없지만, 무거운 일격만으로도 충분한 위협이 됩니다." },
  skeleton: { name: "\uc2a4\ucf08\ub808\ud1a4", chapter: 1, sprite: "skeleton", traitName: "\uc9d1\uc911 \uc0ac\uaca9", traitDescription: "\uc2a4\ucf08\ub808\ud1a4\uc774 \ud50c\ub808\uc774\uc5b4\ub97c \uacf5\uaca9 \ud560 \ub54c\ub9c8\ub2e4 \uacf5\uaca9\ub825\uc774 +2 \uc99d\uac00\ud569\ub2c8\ub2e4. \ucd5c\ub300 +6\uae4c\uc9c0 \uc99d\uac00\ud569\ub2c8\ub2e4.", story: "오래된 병사의 잔해가 미약한 저주로 다시 움직이는 언데드입니다. 처음에는 둔하지만, 목표를 정하면 점점 더 정확하게 공격을 맞춰 옵니다." },
  kingSlime: { name: "\ud0b9 \uc2ac\ub77c\uc784", chapter: 1, sprite: "kingSlime", traitName: "\ubd84\uc5f4", traitDescription: "\ucc98\uce58 \uc2dc HP 20, \uacf5\uaca9\ub825 5\uc758 \uc2ac\ub77c\uc784\uc73c\ub85c \ubd84\uc5f4\ud569\ub2c8\ub2e4.", story: "오래 살아남은 슬라임이 주변 마력을 흡수해 거대화한 개체입니다. 몸 안에 여러 핵이 있어 쓰러져도 작은 개체로 갈라질 수 있습니다." },
  magmaSlime: { name: "\ub9c8\uadf8\ub9c8 \uc2ac\ub77c\uc784", chapter: 2, sprite: "magmaSlime", traitName: "\ud654\uc0c1 \uc810\uc561", traitDescription: "30% \ud655\ub960\ub85c 2\ud134 \ub3d9\uc548 \ud654\uc0c1\uc744 \ubd80\uc5ec\ud569\ub2c8\ub2e4. \ud654\uc0c1 \uc0c1\ud0dc\ub294 \ub9e4 \ud134 3 \ud53c\ud574\ub97c \uc8fc\uace0 \uce58\uc720 \ud6a8\uacfc\ub97c 50% \uac10\uc18c\uc2dc\ud0b5\ub2c8\ub2e4.", story: "용암 지대의 열기를 머금은 슬라임입니다. 표면의 점액은 식지 않는 불씨처럼 달라붙어 상처의 회복을 방해합니다." },
  magmaScorpion: { name: "\ub9c8\uadf8\ub9c8 \uc804\uac08", chapter: 2, sprite: "magmaScorpion", traitName: "\ud654\uc0c1 \uc790\uadf9", traitDescription: "\uacf5\uaca9 \uc131\uacf5 \uc2dc \ud655\uc815\uc73c\ub85c 2\ud134 \ub3d9\uc548 \ud654\uc0c1\uc744 \ubd80\uc5ec\ud569\ub2c8\ub2e4. \ud654\uc0c1 \uc0c1\ud0dc\ub294 \ub9e4 \ud134 3 \ud53c\ud574\ub97c \uc8fc\uace0 \uce58\uc720 \ud6a8\uacfc\ub97c 50% \uac10\uc18c\uc2dc\ud0b5\ub2c8\ub2e4.", story: "갈라진 화산암 아래에 숨어 있다가 열기에 약해진 먹잇감을 노립니다. 꼬리의 독침에는 마그마의 잔열이 남아 있어 상처를 오래 태웁니다." },
  emberMoth: { name: "\uc7bf\ubd88 \ub098\ubc29", chapter: 2, sprite: "emberMoth", traitName: "\uc7bf\uac00\ub8e8", traitDescription: "\ud50c\ub808\uc774\uc5b4\ub97c \uacf5\uaca9\ud560 \ub54c \ud50c\ub808\uc774\uc5b4 \uacf5\uaca9\ub825\uc744 -2 \uac10\uc18c\uc2dc\ud0b5\ub2c8\ub2e4.", story: "불탄 나무와 재가 쌓인 곳에서 나타나는 마물입니다. 날개에서 떨어지는 잿가루는 시야와 호흡을 흐트러뜨려 반격의 힘을 빼앗습니다." },
  obsidianKnight: { name: "\ud751\uc694\uc11d \uae30\uc0ac", chapter: 2, sprite: "obsidianKnight", traitName: "\ud751\uc694\uc11d \uac11\uc637", traitDescription: "\ubc1b\ub294 \ud53c\ud574\ub97c 2 \uac10\uc18c\uc2dc\ud0b5\ub2c8\ub2e4.", story: "화산 심부에서 굳은 흑요석 갑옷에 원혼이 깃든 존재입니다. 표면은 유리처럼 날카롭고 단단해 가벼운 공격은 거의 흘려냅니다." },
  magmaGolem: { name: "\ub9c8\uadf8\ub9c8 \uace8\ub818", chapter: 2, sprite: "magmaGolem", traitName: "\uacfc\uc5f4", traitDescription: "3\ud134\ub9c8\ub2e4 \uacf5\uaca9\ub825\uc774 +3 \uc99d\uac00\ud569\ub2c8\ub2e4.", story: "식지 않은 용암과 검은 암석이 뭉쳐 만들어진 거대한 수호체입니다. 전투가 길어질수록 내부 열이 올라 움직임은 느려도 일격은 더욱 무거워집니다." },
  hellhound: { name: "\ud654\uc5fc \ud5ec\ud558\uc6b4\ub4dc", chapter: 2, sprite: "hellhound", traitName: "\ub354\ube14 \uc5b4\ud0dd", traitDescription: "25% \ud655\ub960\ub85c 2\uc5f0\ud0c0 \uacf5\uaca9\uc744 \ud569\ub2c8\ub2e4.", story: "불길 속에서 길들여진 사냥개형 마물입니다. 한번 냄새를 기억한 대상은 놓치지 않으며, 틈이 보이면 두 번 연속으로 물어뜯습니다." },
  fireSalamander: { name: "\ud654\uc5fc \uc0d0\ub7ec\ub9e8\ub354", chapter: 2, sprite: "fireSalamander", traitName: "\uc6a9\uc554\ud608\ub958", traitDescription: "\ub9e4\ud134 HP\ub97c 10 \ud68c\ubcf5\ud569\ub2c8\ub2e4.", story: "용암 줄기를 둥지 삼아 살아가는 화염 생물입니다. 몸 안을 흐르는 뜨거운 혈류가 상처를 계속 메워, 짧은 전투로 끝내지 못하면 점점 불리해집니다." },
  creepingHand: { name: "크리핑 핸드", chapter: 3, sprite: "creepingHand", traitName: "악력 약화", traitDescription: "공격 성공 시 플레이어의 공격력을 -5 감소시킵니다.", story: "잘려 나간 손에 사념이 들러붙어 움직이는 불완전한 언데드입니다. 손아귀에 붙잡힌 대상은 힘이 빠지고 무기를 제대로 휘두르기 어려워집니다." },
  wraith: { name: "망령", chapter: 3, sprite: "wraith", traitName: "망령화", traitDescription: "20% 확률로 플레이어의 공격을 회피합니다.", story: "죽음의 순간을 반복하는 혼이 형태를 잃고 떠도는 존재입니다. 실체가 희미해지는 순간에는 칼날과 주문조차 허공을 스치고 지나갑니다." },
  necromancer: { name: "네크로맨서", chapter: 3, sprite: "necromancer", traitName: "사령 지휘", traitDescription: "자신의 턴마다 살아있는 아군의 공격력을 +3 증가시킵니다.", story: "금지된 사령술로 시체와 원혼을 부리는 마법사입니다. 직접 싸우는 힘은 크지 않지만, 전장에 남은 언데드를 더 위험한 병력으로 바꿉니다." },
  dullahan: { name: "듀라한", chapter: 3, sprite: "dullahan", traitName: "폭주", traitDescription: "자신의 체력이 50% 이하일 때 공격력이 50% 증가합니다.", story: "목 없는 기사와 검은 군마가 하나의 저주로 묶인 언데드입니다. 쓰러질 위기에 몰리면 잃어버린 머리를 찾듯 방향을 가리지 않고 돌진합니다." },
  deathGuardian: { name: "데스 가디언", chapter: 3, sprite: "deathGuardian", traitName: "불멸의 장벽", traitDescription: "받는 피해를 40% 감소시킵니다.", story: "죽은 왕의 묘실을 지키기 위해 세워진 중갑 수호자입니다. 갑옷 곳곳에 새겨진 봉인이 공격을 흡수해, 정면 승부에서는 쉽게 무너지지 않습니다." },
  fallenPriest: { name: "타락한 사제", chapter: 3, sprite: "fallenPriest", traitName: "타락한 축복", traitDescription: "자신의 턴마다 살아있는 아군의 HP를 7 회복시킵니다.", story: "구원의 기도를 저주의 의식으로 바꿔 버린 사제입니다. 그가 내리는 축복은 생명을 살리는 대신 죽은 자의 몸을 다시 움직이게 만듭니다." },
  deathReaper: { name: "데스 리퍼", chapter: 3, sprite: "deathReaper", traitName: "사형선고", traitDescription: "공격 후 플레이어의 HP가 20% 이하이면 즉시 처형합니다.", story: "전장에 오래 남은 죽음의 기운이 형체를 얻은 존재입니다. 약해진 생명의 흔적을 놓치지 않고 마지막 일격을 내립니다." },
  cursedKnight: { name: "저주받은 기사", chapter: 3, sprite: "cursedKnight", traitName: "저주 갑주", traitDescription: "받는 피해를 20% 감소시킵니다.", story: "끝나지 않은 전쟁의 원념을 갑옷째 짊어진 기사입니다. 저주가 갑주를 단단히 붙들고 있어, 상처를 내도 쉽게 전투 의지를 잃지 않습니다." },
  lich: { name: "리치", chapter: 3, sprite: "lich", traitName: "불사 의식", traitDescription: "1회 부활합니다. 부활 시 HP 90, 공격력 50으로 되살아납니다.", story: "죽음을 거부한 마법사가 자신의 영혼을 의식에 묶어 탄생한 언데드입니다. 육체가 무너져도 준비된 의식이 남아 있다면 다시 일어섭니다." }
};

const player = {
  hp: 100,
  maxHp: 100,
  baseDamage: 10
};

const difficultyData = {
  easy: { name: "\uc26c\uc6c0", multiplier: 1, time: 60 },
  normal: { name: "\ubcf4\ud1b5", multiplier: 1.5, time: 45 },
  hard: { name: "\uc5b4\ub824\uc6c0", multiplier: 2, time: 45 }
};

const equipmentData = {
  oldDagger: { id: "oldDagger", name: "낡은 단검", type: "atk", value: 2, stage: 1 },
  leatherArmor: { id: "leatherArmor", name: "가죽 갑옷", type: "hp", value: 20, stage: 2 },
  steelSword: { id: "steelSword", name: "강철 검", type: "atk", value: 4, stage: 3 },
  ironArmor: { id: "ironArmor", name: "철 갑옷", type: "hp", value: 35, stage: 4 },
  crystalBlade: { id: "crystalBlade", name: "마력 수정검", type: "atk", value: 6, stage: 5 },
  guardianCharm: { id: "guardianCharm", name: "수호 부적", type: "hp", value: 50, stage: 6 },
  lavaBlade: { id: "lavaBlade", name: "용암 절단검", type: "atk", value: 8, stage: 7 },
  lavaShield: { id: "lavaShield", name: "용암 방패", type: "hp", value: 70, stage: 8 },
  reaperBreaker: { id: "reaperBreaker", name: "사신 파쇄검", type: "atk", value: 10, stage: 9 },
  titanEdge: { id: "titanEdge", name: "거인의 참격검", type: "atk", value: 14, shopCost: 170 },
  abyssPlate: { id: "abyssPlate", name: "심연 판금갑", type: "hp", value: 105, shopCost: 185 },
  eclipseBlade: { id: "eclipseBlade", name: "일식 마검", type: "atk", value: 18, shopCost: 280 },
  immortalCore: { id: "immortalCore", name: "불멸의 핵", type: "hp", value: 150, shopCost: 320 }
};

const stageEquipmentRewards = [
  "oldDagger",
  "leatherArmor",
  "steelSword",
  "ironArmor",
  "crystalBlade",
  "guardianCharm",
  "lavaBlade",
  "lavaShield",
  "reaperBreaker"
];

const potionRewards = [
  { id: "largeHpPotion", name: "대형 생명 포션", stat: "hp", percent: 0.3, threshold: 0.05 },
  { id: "largeAtkPotion", name: "대형 힘 포션", stat: "atk", percent: 0.3, threshold: 0.1 },
  { id: "mediumHpPotion", name: "중형 생명 포션", stat: "hp", percent: 0.2, threshold: 0.25 },
  { id: "mediumAtkPotion", name: "중형 힘 포션", stat: "atk", percent: 0.2, threshold: 0.4 },
  { id: "smallHpPotion", name: "소형 생명 포션", stat: "hp", percent: 0.1, threshold: 0.7 },
  { id: "smallAtkPotion", name: "소형 힘 포션", stat: "atk", percent: 0.1, threshold: 1 }
];

const shopItems = [
  { id: "smallHpPotion", kind: "potion", cost: 18 },
  { id: "smallAtkPotion", kind: "potion", cost: 18 },
  { id: "mediumHpPotion", kind: "potion", cost: 45 },
  { id: "mediumAtkPotion", kind: "potion", cost: 45 },
  { id: "largeHpPotion", kind: "potion", cost: 85 },
  { id: "largeAtkPotion", kind: "potion", cost: 85 },
  { id: "titanEdge", kind: "equipment", cost: 170 },
  { id: "abyssPlate", kind: "equipment", cost: 185 },
  { id: "eclipseBlade", kind: "equipment", cost: 280 },
  { id: "immortalCore", kind: "equipment", cost: 320 }
];

const state = {
  stage: 1,
  nextStage: 1,
  monsters: [],
  selectedMonsterIndex: null,
  stunnedMonsterIndex: null,
  selectedDifficulty: null,
  currentQuestion: null,
  turn: "home",
  timerId: null,
  timeLeft: 0,
  gameOver: false,
  poisonTurns: 0,
  burnTurns: 0,
  healReductionTurns: 0,
  playerAttackPenalty: 0,
  defeatedMonsters: new Set(),
  defeatingMonsters: new Set(),
  clearedStages: new Set(),
  claimedStageRewards: new Set(),
  codex: new Set(),
  activeStage: 1,
  selectedChapter: null,
  coins: 0,
  inventory: [],
  equippedIds: new Set(),
  potions: {},
  potionUsedThisTurn: false,
  turnAtkPotionBonus: 0
};

const homeScreen = document.getElementById("homeScreen");
const mainScreen = document.getElementById("mainScreen");
const victoryScreen = document.getElementById("victoryScreen");
const battleScreen = document.getElementById("battleScreen");
const dungeonTransition = document.getElementById("dungeonTransition");
const battleBackground = document.getElementById("battleBackground");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const retryButton = document.getElementById("retryButton");
const mainButton = document.getElementById("mainButton");
const mainHomeButton = document.getElementById("mainHomeButton");
const nextStageButton = document.getElementById("nextStageButton");
const returnHubButton = document.getElementById("returnHubButton");
const mainTitle = document.getElementById("mainTitle");
const mainDescription = document.getElementById("mainDescription");
const mainHpText = document.getElementById("mainHpText");
const mainAtkText = document.getElementById("mainAtkText");
const mainCoinText = document.getElementById("mainCoinText");
const victoryText = document.getElementById("victoryText");
const victoryMainButton = document.getElementById("victoryMainButton");
const victoryNextButton = document.getElementById("victoryNextButton");
const stageActionTitle = document.getElementById("stageActionTitle");
const stageActionText = document.getElementById("stageActionText");
const chapterMap = document.getElementById("chapterMap");
const mainHubView = document.getElementById("mainHubView");
const shopView = document.getElementById("shopView");
const codexView = document.getElementById("codexView");
const equipmentView = document.getElementById("equipmentView");
const shopButton = document.getElementById("shopButton");
const codexButton = document.getElementById("codexButton");
const equipmentButton = document.getElementById("equipmentButton");
const codexGrid = document.getElementById("codexGrid");
const codexDetail = document.getElementById("codexDetail");
const inventoryGrid = document.getElementById("inventoryGrid");
const equipmentHint = document.getElementById("equipmentHint");
const atkSlotA = document.getElementById("atkSlotA");
const atkSlotB = document.getElementById("atkSlotB");
const hpSlotA = document.getElementById("hpSlotA");
const hpSlotB = document.getElementById("hpSlotB");
const gameOverOverlay = document.getElementById("gameOverOverlay");
const playerUnit = document.getElementById("playerUnit");
const playerSprite = document.getElementById("playerSprite");
const stageTitle = document.getElementById("stageTitle");
const turnText = document.getElementById("turnText");
const playerHpText = document.getElementById("playerHpText");
const playerAtkText = document.getElementById("playerAtkText");
const playerHpBar = document.getElementById("playerHpBar");
const monsterList = document.getElementById("monsterList");
const selectedMonsterText = document.getElementById("selectedMonsterText");
const monsterTraitPanel = document.getElementById("monsterTraitPanel");
const questionText = document.getElementById("questionText");
const timerText = document.getElementById("timerText");
const answerForm = document.getElementById("answerForm");
const potionRow = document.getElementById("potionRow");
const answerInput = document.getElementById("answerInput");
const attackButton = document.getElementById("attackButton");
const message = document.getElementById("message");
const difficultyButtons = document.querySelectorAll("[data-difficulty]");

function cloneMonsters(monsters) {
  return monsters.map((monster) => ({ ...monster }));
}

function getEquippedItems(type = null) {
  return [...state.equippedIds]
    .map((id) => equipmentData[id])
    .filter((item) => item && (!type || item.type === type));
}

function getEquipmentBonus(type) {
  return getEquippedItems(type).reduce((total, item) => total + item.value, 0);
}

function getPlayerMaxHp() {
  return player.maxHp + getEquipmentBonus("hp");
}

function getPlayerBaseAttack() {
  return player.baseDamage + getEquipmentBonus("atk") + state.turnAtkPotionBonus;
}

function syncPlayerStats(keepRatio = false) {
  const previousMaxHp = player.currentMaxHp || player.maxHp;
  const nextMaxHp = getPlayerMaxHp();
  const hpRatio = previousMaxHp > 0 ? player.hp / previousMaxHp : 1;
  player.currentMaxHp = nextMaxHp;
  player.hp = keepRatio
    ? Math.max(1, Math.min(nextMaxHp, Math.round(nextMaxHp * hpRatio)))
    : Math.min(nextMaxHp, player.hp);
  updateMainStats();
}

function updateMainStats() {
  if (mainHpText) {
    mainHpText.textContent = getPlayerMaxHp();
  }
  if (mainAtkText) {
    mainAtkText.textContent = getPlayerBaseAttack();
  }
  if (mainCoinText) {
    mainCoinText.textContent = state.coins;
  }
}

function showScreen(screen) {
  homeScreen.classList.toggle("hidden", screen !== "home");
  mainScreen.classList.toggle("hidden", screen !== "main");
  victoryScreen.classList.toggle("hidden", screen !== "victory");
  battleScreen.classList.toggle("hidden", screen !== "battle");
}

function showHome() {
  clearQuestionTimer();
  gameOverOverlay.classList.add("hidden");
  playerUnit.classList.remove("down");
  playerSprite.src = sprites.player.idle;
  state.turn = "home";
  updateMainStats();
  showScreen("home");
}

function startGame() {
  state.coins = 0;
  state.inventory = [];
  state.equippedIds.clear();
  state.potions = {};
  state.potionUsedThisTurn = false;
  state.turnAtkPotionBonus = 0;
  state.claimedStageRewards.clear();
  player.currentMaxHp = getPlayerMaxHp();
  player.hp = getPlayerMaxHp();
  state.stage = 1;
  state.nextStage = 1;
  state.activeStage = 1;
  state.clearedStages.clear();
  state.codex.clear();
  state.gameOver = false;
  gameOverOverlay.classList.add("hidden");
  playerUnit.classList.remove("down");
  playerSprite.src = sprites.player.idle;
  showMainScreen(0);
}

function showMainScreen(clearedStage) {
  clearQuestionTimer();
  state.turn = "main";
  state.nextStage = Math.min(stageMonsterData.length + 1, Math.max(state.nextStage, clearedStage + 1));
  state.selectedChapter = null;
  syncPlayerStats();
  player.hp = getPlayerMaxHp();
  showScreen("main");
  showMainView("hub");

  mainTitle.textContent = "\ub358\uc804 \uc785\uad6c";
  mainDescription.textContent = "\uc0c1\uc810, \ub3c4\uac10, \uc7a5\ube44\ub97c \ud655\uc778\ud558\uace0 \uc804\ud22c\uc5d0 \uc785\uc7a5\ud558\uc138\uc694.";
  renderChapterMap();
}

function getHighestClearedStage() {
  return state.clearedStages.size > 0 ? Math.max(...state.clearedStages) : 0;
}

function showMainView(view) {
  mainHubView.classList.toggle("hidden", view !== "hub");
  shopView.classList.toggle("hidden", view !== "shop");
  codexView.classList.toggle("hidden", view !== "codex");
  equipmentView.classList.toggle("hidden", view !== "equipment");
  updateMainStats();
  if (view === "shop") {
    renderShop();
  }
  if (view === "codex") {
    renderCodex();
  }
  if (view === "equipment") {
    renderEquipment();
  }
}

function enterNextStage() {
  enterStage(getChapterNumber(state.nextStage), getChapterStageNumber(state.nextStage));
}

async function enterStage(chapter, stageNumber) {
  if (!canEnterStage(chapter, stageNumber)) {
    return;
  }
  const stageIndex = getStageIndex(chapter, stageNumber);

  await playDungeonTransition(async () => {
    state.stage = stageIndex;
    state.activeStage = stageIndex;
    state.gameOver = false;
    showScreen("battle");
    loadStage(state.stage);
  });
}

function canEnterStage(chapter, stageNumber) {
  const chapterData = chapters.find((item) => item.number === chapter);
  const stageIndex = getStageIndex(chapter, stageNumber);
  if (!chapterData || !chapterData.implemented || stageNumber < 1 || stageNumber > 3 || stageIndex > stageMonsterData.length) {
    return false;
  }

  return state.clearedStages.has(stageIndex) || stageIndex <= state.nextStage;
}

function getClearedCount(chapter) {
  const start = getStageIndex(chapter, 1);
  const end = getStageIndex(chapter, 3);
  return [...state.clearedStages].filter((stageNumber) => stageNumber >= start && stageNumber <= end).length;
}

function getStageIndex(chapter, stageNumber) {
  return (chapter - 1) * 3 + stageNumber;
}

function getChapterNumber(stageIndex) {
  return Math.floor((stageIndex - 1) / 3) + 1;
}

function getChapterStageNumber(stageIndex) {
  return ((stageIndex - 1) % 3) + 1;
}

function getStageLabel(stageIndex) {
  return `${getChapterNumber(stageIndex)}-${getChapterStageNumber(stageIndex)}`;
}

function renderChapterMap() {
  chapterMap.innerHTML = "";

  if (state.selectedChapter === null) {
    stageActionTitle.textContent = "\ucc55\ud130 \uc120\ud0dd";
    stageActionText.textContent = "\uc785\uc7a5\ud560 \ucc55\ud130\ub97c \uba3c\uc800 \uc120\ud0dd\ud558\uc138\uc694.";
    nextStageButton.classList.add("hidden");
    chapterMap.classList.remove("stage-select-mode");

    chapters.forEach((chapter) => {
      const cleared = getClearedCount(chapter.number);
      const button = document.createElement("button");
      button.type = "button";
      button.className = ["chapter-tile", chapter.implemented ? "available" : "locked"].join(" ");
      button.disabled = !chapter.implemented;
      button.innerHTML = `<strong>${chapter.title}</strong><span>${cleared}/3</span><small>${chapter.implemented ? "\uc2a4\ud14c\uc774\uc9c0 \uc120\ud0dd" : "\uc900\ube44\uc911"}</small>`;
      button.addEventListener("click", () => {
        state.selectedChapter = chapter.number;
        renderChapterMap();
      });
      chapterMap.appendChild(button);
    });
    return;
  }

  const chapter = chapters.find((item) => item.number === state.selectedChapter);
  const cleared = getClearedCount(state.selectedChapter);
  stageActionTitle.textContent = `${chapter.title} ${cleared}/3`;
  stageActionText.textContent = "\uc785\uc7a5\ud560 \uc2a4\ud14c\uc774\uc9c0\ub97c \uc120\ud0dd\ud558\uc138\uc694. \uc7a0\uae34 \uc2a4\ud14c\uc774\uc9c0\ub294 \uba3c\uc800 \uc774\uc804 \uc804\ud22c\ub97c \ud074\ub9ac\uc5b4\ud574\uc57c \ud569\ub2c8\ub2e4.";
  nextStageButton.classList.add("hidden");
  chapterMap.classList.add("stage-select-mode");

  const backButton = document.createElement("button");
  backButton.type = "button";
  backButton.className = "chapter-back-button";
  backButton.textContent = "\u2190 \ucc55\ud130 \uc120\ud0dd";
  backButton.addEventListener("click", () => {
    state.selectedChapter = null;
    renderChapterMap();
  });
  chapterMap.appendChild(backButton);

  for (let stageNumber = 1; stageNumber <= 3; stageNumber += 1) {
    const stageIndex = getStageIndex(chapter.number, stageNumber);
    const unlocked = chapter.implemented && canEnterStage(chapter.number, stageNumber);
    const clearedStage = state.clearedStages.has(stageIndex);
    const button = document.createElement("button");
    button.type = "button";
    button.className = ["stage-node", unlocked ? "unlocked" : "locked", clearedStage ? "cleared" : ""].join(" ");
    button.disabled = !unlocked;
    button.innerHTML = `<span>${chapter.number}-${stageNumber}</span><small>${clearedStage ? "\ud074\ub9ac\uc5b4" : unlocked ? "\uc785\uc7a5 \uac00\ub2a5" : "\uc7a0\uae40"}</small>`;
    button.addEventListener("click", () => enterStage(chapter.number, stageNumber));
    chapterMap.appendChild(button);
  }
}

function playDungeonTransition(action) {
  return new Promise((resolve) => {
    dungeonTransition.classList.remove("hidden", "fade-out");
    dungeonTransition.classList.add("fade-in");

    window.setTimeout(() => {
      action();
      dungeonTransition.classList.remove("fade-in");
      dungeonTransition.classList.add("fade-out");
    }, 460);

    window.setTimeout(() => {
      dungeonTransition.classList.add("hidden");
      dungeonTransition.classList.remove("fade-out");
      resolve();
    }, 920);
  });
}

function loadStage(stageNumber) {
  clearQuestionTimer();
  syncPlayerStats();
  player.hp = getPlayerMaxHp();
  playerUnit.classList.remove("down");
  playerSprite.src = sprites.player.idle;
  state.monsters = cloneMonsters(stageMonsterData[stageNumber - 1]);
  state.selectedMonsterIndex = null;
  state.stunnedMonsterIndex = null;
  state.selectedDifficulty = null;
  state.currentQuestion = null;
  state.poisonTurns = 0;
  state.burnTurns = 0;
  state.healReductionTurns = 0;
  state.playerAttackPenalty = 0;
  state.potionUsedThisTurn = false;
  state.turnAtkPotionBonus = 0;
  state.defeatedMonsters.clear();
  state.defeatingMonsters.clear();
  state.turn = "player";
  resetQuestionInput();
  setMessage(`테마 ${getStageLabel(stageNumber)} 전투 시작. 공격할 몬스터를 선택하세요.`);
  render();
}

function render() {
  stageTitle.textContent = `테마 ${getStageLabel(state.stage)}`;
  turnText.textContent = state.turn === "monster" ? "몬스터 턴" : "플레이어 턴";
  playerHpText.textContent = `${player.hp} / ${getPlayerMaxHp()}`;
  playerAtkText.textContent = getPlayerAttack();
  playerHpBar.style.width = `${getHpPercent(player.hp, getPlayerMaxHp())}%`;
  playerUnit.classList.toggle("down", player.hp <= 0);

  battleBackground.classList.toggle("stage-2", getChapterNumber(state.stage) === 2);
  battleBackground.classList.toggle("stage-3", getChapterNumber(state.stage) === 3);

  selectedMonsterText.textContent =
    state.selectedMonsterIndex === null
      ? "몬스터를 선택하세요"
      : state.monsters[state.selectedMonsterIndex].name;

  monsterList.innerHTML = "";
  state.monsters.forEach((monster, index) => {
    const isDead = monster.hp <= 0;
    const isStunned = state.stunnedMonsterIndex === index && !isDead;
    const spriteSet = sprites[monster.sprite];
    const imageSrc = getMonsterSprite(monster, index, spriteSet);
    const info = monsterInfo[monster.id] || monsterInfo[monster.sprite];
    const traitName = info ? info.traitName : "없음";
    const traitDescription = info ? info.traitDescription : "특성이 없습니다.";
    const button = document.createElement("button");
    button.type = "button";
    button.className = [
      "monster-card",
      `monster-${monster.sprite}`,
      monster.small ? "small-monster" : "",
      monster.boss ? "boss-monster" : "",
      monster.warrior ? "warrior-monster" : "",
      isDead ? "dead" : "alive",
      isStunned ? "stunned" : "",
      state.defeatingMonsters.has(index) ? "defeating" : "",
      state.defeatedMonsters.has(index) ? "defeated" : "",
      state.selectedMonsterIndex === index ? "selected" : ""
    ].join(" ");
    button.disabled = isDead || state.turn !== "player" || state.currentQuestion !== null || state.gameOver;
    button.innerHTML = `
      <span class="stun-badge">기절</span>
      <div class="monster-body">
        <img src="${imageSrc}" alt="${monster.name}">
      </div>
      <div class="monster-speech ${index >= state.monsters.length - 1 ? "speech-left" : "speech-right"}">
        <strong>${monster.name}</strong>
        <span>HP ${monster.hp}/${monster.maxHp} · AT ${monster.attack}</span>
        <p>특성 : ${traitName}</p>
        <div class="trait-box">${traitDescription}</div>
      </div>
      <strong class="unit-name">${monster.name}</strong>
      <div class="stat-line">
        <span>♥ <b>${monster.hp} / ${monster.maxHp}</b></span>
        <span>⚔ <b>${monster.attack}</b></span>
      </div>
      <div class="hp-bar">
        <div class="hp-fill monster-fill" style="width: ${getHpPercent(monster.hp, monster.maxHp)}%"></div>
      </div>
    `;
    button.addEventListener("click", () => selectMonster(index));
    button.addEventListener("mouseenter", () => showMonsterTrait());
    button.addEventListener("focus", () => showMonsterTrait());
    button.addEventListener("mouseleave", resetMonsterTrait);
    button.addEventListener("blur", resetMonsterTrait);
    monsterList.appendChild(button);
  });

  difficultyButtons.forEach((button) => {
    button.disabled =
      state.selectedMonsterIndex === null ||
      state.currentQuestion !== null ||
      state.turn !== "player" ||
      state.gameOver;
    button.classList.toggle("active", button.dataset.difficulty === state.selectedDifficulty);
  });

  renderPotionRow();
}

function showMonsterTrait() {
  battleBackground.classList.add("trait-focus");
}

function resetMonsterTrait() {
  battleBackground.classList.remove("trait-focus");
}

function renderCodex() {
  codexGrid.innerHTML = "";
  codexDetail.className = "codex-detail";
  codexDetail.textContent = "몬스터를 클릭하면 상세 정보가 표시됩니다.";

  chapters.forEach((chapter) => {
    const title = document.createElement("h4");
    title.className = "codex-chapter-title";
    title.textContent = `${chapter.title} 도감`;
    codexGrid.appendChild(title);

    const row = document.createElement("div");
    row.className = "codex-chapter-row";
    const entries = Object.entries(monsterInfo).filter(([, info]) => info.chapter === chapter.number);
    const paddedEntries = [...entries];
    while (paddedEntries.length < 3) {
      paddedEntries.push([`empty-${chapter.number}-${paddedEntries.length}`, null]);
    }

    paddedEntries.forEach(([id, info]) => {
      const discovered = info && state.codex.has(id);
      const button = document.createElement("button");
      button.type = "button";
      button.className = ["codex-entry", discovered ? "discovered" : "unknown"].join(" ");
      button.disabled = !discovered;
      button.innerHTML = discovered
        ? `<img src="${sprites[info.sprite].idle}" alt="${info.name}"><span>${info.name}</span>`
        : `<span class="unknown-mark">???</span>`;
      if (discovered) {
        button.addEventListener("click", () => showCodexDetail(id));
      }
      row.appendChild(button);
    });

    codexGrid.appendChild(row);
  });
}

function showCodexDetail(id) {
  const info = monsterInfo[id];
  if (!info) {
    return;
  }

  const stats = getCodexMonsterStats(id, info.sprite);
  codexDetail.className = `codex-detail codex-detail-${info.sprite}`;
  codexDetail.innerHTML = `
    <div class="codex-detail-image">
      <img src="${sprites[info.sprite].idle}" alt="${info.name}">
    </div>
    <h4>${info.name}</h4>
    <div class="codex-stat-line">
      <span>HP <b>${stats.hp}</b></span>
      <span>AT <b>${stats.attack}</b></span>
    </div>
    <p><strong>특성 : ${info.traitName}</strong></p>
    <div class="trait-box">${info.traitDescription}</div>
    <p>${info.story}</p>
  `;
}

function getCodexMonsterStats(id, sprite) {
  const matches = stageMonsterData
    .flat()
    .filter((monster) => monster.id === id || monster.sprite === sprite);

  if (matches.length === 0) {
    return { hp: "-", attack: "-" };
  }

  return matches.reduce((best, monster) => ({
    hp: Math.max(best.hp, monster.maxHp || monster.hp || 0),
    attack: Math.max(best.attack, monster.attack || monster.baseAttack || 0)
  }), { hp: 0, attack: 0 });
}

function renderShop() {
  shopView.innerHTML = `
    <button class="back-button" type="button" data-shop-back>← 메인</button>
    <h3>상점</h3>
    <div class="shop-balance">보유 코인 <strong>${state.coins}</strong></div>
    <div class="shop-grid"></div>
  `;

  shopView.querySelector("[data-shop-back]").addEventListener("click", () => showMainView("hub"));
  const grid = shopView.querySelector(".shop-grid");

  shopItems.forEach((item) => {
    const data = getShopItemData(item);
    const owned = item.kind === "equipment" && state.inventory.includes(item.id);
    const affordable = state.coins >= item.cost;
    const potionCount = item.kind === "potion" ? (state.potions[item.id] || 0) : 0;
    const button = document.createElement("button");
    button.type = "button";
    button.className = ["shop-item", item.kind, owned ? "owned" : ""].join(" ");
    button.disabled = owned || !affordable;
    button.innerHTML = `
      <span class="shop-item-icon">${data.icon}</span>
      <strong>${data.name}</strong>
      <small>${data.description}${item.kind === "potion" ? ` · 보유 ${potionCount}` : ""}</small>
      <b>${owned ? "보유 중" : `${item.cost} 코인`}</b>
    `;
    button.addEventListener("click", () => buyShopItem(item.id));
    grid.appendChild(button);
  });
}

function getShopItemData(item) {
  if (item.kind === "equipment") {
    const equipment = equipmentData[item.id];
    return {
      name: equipment.name,
      icon: equipment.type === "atk" ? "⚔" : "♥",
      description: `${equipment.type === "atk" ? "공격력" : "최대 HP"} +${equipment.value}`
    };
  }

  const potion = getPotionById(item.id);
  return {
    name: potion.name,
    icon: potion.stat === "atk" ? "✦" : "+",
    description: `${potion.stat === "atk" ? "공격력" : "최대 HP"} +${Math.round(potion.percent * 100)}%`
  };
}

function buyShopItem(id) {
  const item = shopItems.find((shopItem) => shopItem.id === id);
  if (!item) {
    return;
  }

  if (state.coins < item.cost) {
    setMessage("코인이 부족합니다.");
    renderShop();
    return;
  }

  if (item.kind === "equipment") {
    if (state.inventory.includes(item.id)) {
      setMessage("이미 보유한 장비입니다.");
      renderShop();
      return;
    }
    state.coins -= item.cost;
    state.inventory.push(item.id);
    setMessage(`${equipmentData[item.id].name}을 구매했습니다.`);
  } else {
    state.coins -= item.cost;
    const potion = getPotionById(item.id);
    addPotion(item.id);
    setMessage(`${potion.name}을 구매했습니다.`);
  }

  updateMainStats();
  renderShop();
}

function renderEquipment() {
  if (!inventoryGrid) {
    return;
  }

  inventoryGrid.innerHTML = "";
  const items = state.inventory.map((id) => equipmentData[id]).filter(Boolean);

  if (items.length === 0) {
    equipmentHint.textContent = "스테이지를 클리어하면 장비를 획득합니다.";
  } else {
    equipmentHint.textContent = "장비를 클릭하면 장착/해제됩니다. 공격 장비 2개, HP 장비 2개까지 장착할 수 있습니다.";
  }

  items.forEach((item) => {
    const equipped = state.equippedIds.has(item.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = ["inventory-item", item.type, equipped ? "equipped" : ""].join(" ");
    button.innerHTML = `
      <strong>${item.name}</strong>
      <span>${item.type === "atk" ? "AT" : "HP"} +${item.value}</span>
      <small>${equipped ? "장착 중" : "클릭해 장착"}</small>
    `;
    button.addEventListener("click", () => toggleEquipment(item.id));
    inventoryGrid.appendChild(button);
  });

  while (inventoryGrid.children.length < 12) {
    const empty = document.createElement("div");
    empty.className = "inventory-empty";
    inventoryGrid.appendChild(empty);
  }

  renderEquipmentSlots();
}

function renderEquipmentSlots() {
  const atkItems = getEquippedItems("atk");
  const hpItems = getEquippedItems("hp");
  setSlot(atkSlotA, "AT", atkItems[0]);
  setSlot(atkSlotB, "AT", atkItems[1]);
  setSlot(hpSlotA, "HP", hpItems[0]);
  setSlot(hpSlotB, "HP", hpItems[1]);
}

function setSlot(slot, label, item) {
  if (!slot) {
    return;
  }

  slot.classList.toggle("filled", Boolean(item));
  slot.innerHTML = item
    ? `<span>${item.name}</span><small>${label} +${item.value}</small>`
    : `<span>빈 슬롯</span><small>${label}</small>`;
}

function toggleEquipment(id) {
  const item = equipmentData[id];
  if (!item) {
    return;
  }

  if (state.equippedIds.has(id)) {
    state.equippedIds.delete(id);
  } else {
    const equippedSameType = getEquippedItems(item.type);
    if (equippedSameType.length >= 2) {
      setMessage(`${item.type === "atk" ? "공격" : "HP"} 장비는 최대 2개까지 장착할 수 있습니다.`);
      return;
    }
    state.equippedIds.add(id);
  }

  syncPlayerStats(true);
  renderEquipment();
}

function getPotionById(id) {
  return potionRewards.find((potion) => potion.id === id)
    || shopItems.find((item) => item.kind === "potion" && item.id === id);
}

function addPotion(id, amount = 1) {
  state.potions[id] = (state.potions[id] || 0) + amount;
}

function renderPotionRow() {
  if (!potionRow) {
    return;
  }

  potionRow.innerHTML = "";
  const ownedPotions = potionRewards.filter((potion) => (state.potions[potion.id] || 0) > 0);
  if (ownedPotions.length === 0) {
    potionRow.textContent = "보유 포션 없음";
    return;
  }

  ownedPotions.forEach((potion) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = ["potion-button", potion.stat].join(" ");
    button.disabled =
      state.turn !== "player" ||
      state.gameOver ||
      state.currentQuestion !== null ||
      state.potionUsedThisTurn;
    button.innerHTML = `
      <strong>${potion.stat === "hp" ? "HP" : "AT"} ${Math.round(potion.percent * 100)}%</strong>
      <span>x${state.potions[potion.id]}</span>
    `;
    button.addEventListener("click", () => usePotion(potion.id));
    potionRow.appendChild(button);
  });
}

function usePotion(id) {
  const potion = getPotionById(id);
  if (!potion || (state.potions[id] || 0) <= 0) {
    setMessage("사용할 포션이 없습니다.");
    return;
  }

  if (state.turn !== "player" || state.gameOver) {
    setMessage("플레이어 턴에만 포션을 사용할 수 있습니다.");
    return;
  }

  if (state.currentQuestion !== null) {
    setMessage("문제가 출제된 동안에는 포션을 사용할 수 없습니다.");
    return;
  }

  if (state.potionUsedThisTurn) {
    setMessage("포션은 한 턴에 1개만 사용할 수 있습니다.");
    return;
  }

  state.potions[id] -= 1;
  if (state.potions[id] <= 0) {
    delete state.potions[id];
  }
  state.potionUsedThisTurn = true;

  if (potion.stat === "hp") {
    let heal = Math.max(1, Math.round(getPlayerMaxHp() * potion.percent));
    if (state.healReductionTurns > 0) {
      heal = Math.max(1, Math.floor(heal * 0.5));
    }
    player.hp = Math.min(getPlayerMaxHp(), player.hp + heal);
    setMessage(`${potion.name} 사용. HP를 ${heal} 회복했습니다.`);
  } else {
    const bonus = Math.max(1, Math.round((player.baseDamage + getEquipmentBonus("atk")) * potion.percent));
    state.turnAtkPotionBonus += bonus;
    setMessage(`${potion.name} 사용. 이번 턴 공격력이 +${bonus} 증가합니다.`);
  }

  render();
}

function getMonsterSprite(monster, index, spriteSet) {
  if (state.defeatedMonsters.has(index)) {
    return spriteSet.down2;
  }

  if (state.defeatingMonsters.has(index)) {
    return spriteSet.down1;
  }

  if (monster.warrior) {
    return spriteSet.attack;
  }

  return spriteSet.idle;
}

function getHpPercent(hp, maxHp) {
  return Math.max(0, Math.round((hp / maxHp) * 100));
}

function selectMonster(index) {
  if (state.turn !== "player" || state.monsters[index].hp <= 0) {
    return;
  }

  if (state.currentQuestion !== null) {
    setMessage("이미 문제가 출제되었습니다. 답을 입력해 공격을 진행하세요.");
    return;
  }

  state.selectedMonsterIndex = index;
  state.selectedDifficulty = null;
  state.currentQuestion = null;
  clearQuestionTimer();
  resetQuestionInput();
  setMessage(`${state.monsters[index].name} 선택. 난이도를 고르세요.`);
  render();
}

function selectDifficulty(level) {
  if (state.selectedMonsterIndex === null || state.turn !== "player") {
    setMessage("먼저 공격할 몬스터를 클릭하세요.");
    return;
  }

  if (state.currentQuestion !== null) {
    setMessage("이미 문제가 출제되었습니다. 답을 입력해 공격을 진행하세요.");
    return;
  }

  state.selectedDifficulty = level;
  state.currentQuestion = createQuestion(level);
  state.timeLeft = difficultyData[level].time;
  const damage = getDifficultyDamage(level);
  questionText.textContent = `문제: ${state.currentQuestion.text}`;
  answerInput.value = "";
  answerInput.disabled = false;
  attackButton.disabled = false;
  answerInput.focus();
  setMessage(`${difficultyData[level].name} 문제입니다. 정답을 맞히면 ${damage} 데미지.`);
  startQuestionTimer();
  render();
}

function createQuestion(level) {
  let question;
  if (level === "easy") {
    question = createEasyQuestion();
  } else if (level === "normal") {
    question = createNormalQuestion();
  } else {
    question = createHardQuestion();
  }

  if (Number.isInteger(question.answer)) {
    return question;
  }

  return createQuestion(level);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(items) {
  return items[randomNumber(0, items.length - 1)];
}

function createEasyQuestion() {
  if (Math.random() < 0.8) {
    const operator = Math.random() < 0.5 ? "+" : "-";
    let left = randomNumber(1, 9999);
    let right = randomNumber(1, 9999);

    if (operator === "-" && right > left) {
      [left, right] = [right, left];
    }

    return {
      text: `${left} ${operator} ${right} = ?`,
      answer: operator === "+" ? left + right : left - right
    };
  }

  const operator = Math.random() < 0.5 ? "*" : "/";
  if (operator === "*") {
    const left = randomNumber(12, 99);
    const right = randomNumber(2, 99);
    return {
      text: `${left} × ${right} = ?`,
      answer: left * right
    };
  }

  const answer = randomNumber(2, 99);
  const divisor = randomNumber(2, 99);
  return {
    text: `${answer * divisor} ÷ ${divisor} = ?`,
    answer
  };
}

function createNormalQuestion() {
  return pickRandom([
    createLinearEquationQuestion,
    createTwoStepEquationQuestion,
    createRatioQuestion,
    createPercentQuestion,
    createSquareRootQuestion,
    createAreaQuestion
  ])();
}

function createLinearEquationQuestion() {
  const answer = randomNumber(-12, 15);
  const coefficient = randomNumber(2, 9);
  const constant = randomNumber(-30, 30);
  const result = coefficient * answer + constant;
  const sign = constant >= 0 ? "+" : "-";
  return {
    text: `${coefficient}x ${sign} ${Math.abs(constant)} = ${result} 일 때, x = ?`,
    answer
  };
}

function createTwoStepEquationQuestion() {
  const answer = randomNumber(-10, 12);
  const multiplier = randomNumber(2, 7);
  const shift = randomNumber(-20, 20);
  const result = multiplier * (answer + shift);
  const sign = shift >= 0 ? "+" : "-";
  return {
    text: `${multiplier}(x ${sign} ${Math.abs(shift)}) = ${result} 일 때, x = ?`,
    answer
  };
}

function createRatioQuestion() {
  const a = randomNumber(2, 9);
  const b = randomNumber(2, 9);
  const scale = randomNumber(3, 12);
  return {
    text: `${a}:${b} = x:${b * scale} 일 때, x = ?`,
    answer: a * scale
  };
}

function createPercentQuestion() {
  const percent = pickRandom([10, 15, 20, 25, 30, 40, 50]);
  let base = randomNumber(8, 60) * 10;
  while (!Number.isInteger(base * percent / 100)) {
    base = randomNumber(8, 60) * 10;
  }
  return {
    text: `${base}의 ${percent}%는 ?`,
    answer: base * percent / 100
  };
}

function createSquareRootQuestion() {
  const root = randomNumber(5, 25);
  const add = randomNumber(2, 30);
  return {
    text: `√${root * root} + ${add} = ?`,
    answer: root + add
  };
}

function createAreaQuestion() {
  const width = randomNumber(6, 24);
  const height = randomNumber(5, 18);
  return {
    text: `가로 ${width}, 세로 ${height}인 직사각형의 넓이는 ?`,
    answer: width * height
  };
}

function createHardQuestion() {
  if (Math.random() < 0.8) {
    return pickRandom([
      createQuadraticRootQuestion,
      createQuadraticValueQuestion,
      createFunctionValueQuestion,
      createArithmeticSequenceQuestion,
      createLogQuestion
    ])();
  }

  return pickRandom([
    createDerivativeQuestion,
    createDefiniteIntegralQuestion
  ])();
}

function createQuadraticRootQuestion() {
  const rootA = randomNumber(-8, 8);
  let rootB = randomNumber(-8, 8);
  if (rootA === rootB) {
    rootB += 1;
  }
  const sum = rootA + rootB;
  const product = rootA * rootB;
  const middleSign = -sum >= 0 ? "+" : "-";
  const lastSign = product >= 0 ? "+" : "-";
  return {
    text: `x² ${middleSign} ${Math.abs(sum)}x ${lastSign} ${Math.abs(product)} = 0 의 두 근의 합은 ?`,
    answer: sum
  };
}

function createQuadraticValueQuestion() {
  const x = randomNumber(-6, 6);
  const a = randomNumber(1, 4);
  const b = randomNumber(-8, 8);
  const c = randomNumber(-12, 12);
  const bSign = b >= 0 ? "+" : "-";
  const cSign = c >= 0 ? "+" : "-";
  return {
    text: `f(x)=${a}x² ${bSign} ${Math.abs(b)}x ${cSign} ${Math.abs(c)} 일 때, f(${x}) = ?`,
    answer: a * x * x + b * x + c
  };
}

function createFunctionValueQuestion() {
  const a = randomNumber(2, 8);
  const b = randomNumber(-15, 15);
  const x = randomNumber(-10, 10);
  const bSign = b >= 0 ? "+" : "-";
  return {
    text: `f(x)=${a}x ${bSign} ${Math.abs(b)} 일 때, f(${x}) = ?`,
    answer: a * x + b
  };
}

function createArithmeticSequenceQuestion() {
  const first = randomNumber(-10, 20);
  const diff = randomNumber(2, 9);
  const n = randomNumber(8, 20);
  return {
    text: `첫째항 ${first}, 공차 ${diff}인 등차수열의 제${n}항은 ?`,
    answer: first + (n - 1) * diff
  };
}

function createLogQuestion() {
  const base = pickRandom([2, 3, 4, 5]);
  const exponent = randomNumber(2, 5);
  return {
    text: `log_${base}(${base ** exponent}) = ?`,
    answer: exponent
  };
}

function createDerivativeQuestion() {
  const a = randomNumber(1, 5);
  const b = randomNumber(-6, 6);
  const x = randomNumber(-5, 5);
  const bSign = b >= 0 ? "+" : "-";
  return {
    text: `f(x)=${a}x² ${bSign} ${Math.abs(b)}x 일 때, f'(${x}) = ?`,
    answer: 2 * a * x + b
  };
}

function createDefiniteIntegralQuestion() {
  const coefficient = pickRandom([2, 4, 6, 8]);
  const end = randomNumber(2, 6);
  return {
    text: `∫0^${end} ${coefficient}x dx = ?`,
    answer: coefficient * end * end / 2
  };
}

function startQuestionTimer() {
  clearQuestionTimer();
  timerText.textContent = `제한시간: ${state.timeLeft}초`;
  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    timerText.textContent = `제한시간: ${state.timeLeft}초`;

    if (state.timeLeft <= 0) {
      clearQuestionTimer();
      failAttack("시간 초과. 공격하지 못했습니다.");
    }
  }, 1000);
}

function clearQuestionTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function submitAnswer(event) {
  event.preventDefault();
  if (!state.currentQuestion || state.selectedDifficulty === null) {
    return;
  }

  const userAnswer = Number(answerInput.value);
  if (!Number.isFinite(userAnswer)) {
    setMessage("숫자를 입력하세요.");
    return;
  }

  clearQuestionTimer();
  if (userAnswer === state.currentQuestion.answer) {
    applyDamage();
  } else {
    failAttack(`오답입니다. 정답은 ${state.currentQuestion.answer}입니다.`);
  }
}

async function applyDamage() {
  const targetIndex = state.selectedMonsterIndex;
  const monster = state.monsters[targetIndex];
  let damage = getDifficultyDamage(state.selectedDifficulty);
  const attackDodged = monster.ability === "phantomDodge" && Math.random() < 0.2;

  if (monster.ability === "obsidianArmor") {
    damage = Math.max(1, damage - 2);
  }

  if (monster.ability === "immortalWall") {
    damage = Math.max(1, Math.ceil(damage * 0.6));
  }

  if (monster.ability === "cursedArmor") {
    damage = Math.max(1, Math.ceil(damage * 0.8));
  }

  const willDie = monster.hp - damage <= 0;
  resetQuestionInput();
  render();
  await playAttackAnimation(targetIndex);

  if (attackDodged) {
    state.stunnedMonsterIndex = null;
    setMessage(`${monster.name}이 망령화로 공격을 회피했습니다.`);
    render();
    await sleep(250);
    monsterTurn();
    return;
  }

  monster.hp = Math.max(0, monster.hp - damage);
  state.stunnedMonsterIndex = monster.hp > 0 && !monster.boss ? targetIndex : null;
  setMessage(`정답. ${monster.name}에게 ${damage} 데미지. ${monster.hp > 0 ? "이 몬스터는 이번 턴 기절합니다." : "처치했습니다."}`);

  if (willDie) {
    if (tryReviveMonster(monster)) {
      state.stunnedMonsterIndex = null;
      setMessage(`${monster.name}가 불사 의식으로 부활했습니다. HP 90, 공격력 50.`);
      render();
      await sleep(650);
      monsterTurn();
      return;
    }

    registerCodex(monster);
    grantMonsterRewards(monster);
    await playMonsterDefeat(targetIndex);
    state.monsters.splice(targetIndex, 1);
    state.selectedMonsterIndex = null;
    state.stunnedMonsterIndex = null;
    handleMonsterDeath(monster);
  } else {
    render();
  }

  if (state.monsters.length === 0) {
    await sleep(500);
    clearStage();
    return;
  }

  await sleep(250);
  state.turnAtkPotionBonus = 0;
  monsterTurn();
}

function failAttack(text) {
  state.stunnedMonsterIndex = null;
  setMessage(text);
  resetQuestionInput();
  render();
  state.turnAtkPotionBonus = 0;
  setTimeout(monsterTurn, 900);
}

function resetQuestionInput() {
  state.selectedDifficulty = null;
  state.currentQuestion = null;
  answerInput.value = "";
  answerInput.disabled = true;
  attackButton.disabled = true;
  questionText.textContent = "문제: -";
  timerText.textContent = "제한시간: -";
}

function getPlayerAttack() {
  return Math.max(1, getPlayerBaseAttack() - state.playerAttackPenalty);
}

function getDifficultyDamage(level) {
  return Math.round(getPlayerAttack() * difficultyData[level].multiplier);
}

function playAttackAnimation(targetIndex) {
  return new Promise((resolve) => {
    const targetCard = monsterList.children[targetIndex];
    if (!targetCard) {
      resolve();
      return;
    }

    const playerRect = playerUnit.getBoundingClientRect();
    const targetRect = targetCard.getBoundingClientRect();
    const dashX = targetRect.left + targetRect.width * 0.35 - (playerRect.left + playerRect.width * 0.5);

    playerUnit.style.setProperty("--dash-x", `${Math.max(120, dashX)}px`);
    playerUnit.classList.remove("attacking");
    targetCard.classList.remove("hit");
    void playerUnit.offsetWidth;
    playerSprite.src = sprites.player.attack;
    playerUnit.classList.add("attacking");

    window.setTimeout(() => {
      targetCard.classList.add("hit");
    }, 280);

    window.setTimeout(() => {
      playerUnit.classList.remove("attacking");
      targetCard.classList.remove("hit");
      playerSprite.src = sprites.player.idle;
      resolve();
    }, 760);
  });
}

async function playMonsterDefeat(targetIndex) {
  state.defeatingMonsters.add(targetIndex);
  render();
  await sleep(850);
  state.defeatingMonsters.delete(targetIndex);
  render();
  await sleep(650);
}

async function monsterTurn() {
  if (state.gameOver) {
    return;
  }

  state.turn = "monster";
  render();

  const attackers = state.monsters
    .map((monster, index) => ({ monster, index }))
    .filter(({ monster, index }) => monster.hp > 0 && index !== state.stunnedMonsterIndex);

  if (attackers.length === 0) {
    setMessage("기절 또는 처치 때문에 이번 턴 반격할 몬스터가 없습니다.");
    await sleep(700);
  }

  for (const { monster, index } of attackers) {
    if (player.hp <= 0 || monster.hp <= 0) {
      continue;
    }

    const startEffects = [
      ...applyMonsterStartEffect(monster),
      ...applyFocusAttackGrowth(monster),
      ...applyBerserk(monster)
    ];
    if (startEffects.length > 0) {
      render();
      startEffects.forEach((effect) => showTraitEffect(index, effect.text, effect.type));
      setMessage(startEffects[startEffects.length - 1].message);
      await sleep(680);
    }
    setMessage(`${monster.name}이 플레이어에게 달려듭니다.`);
    await playMonsterAttackAnimation(index);
    const hits = getMonsterHitCount(monster);
    const totalDamage = monster.attack * hits;
    player.hp = Math.max(0, player.hp - totalDamage);
    applyMonsterAttackEffect(monster, totalDamage);
    setMessage(`${monster.name} 공격. 플레이어가 ${totalDamage} 데미지를 받았습니다.`);
    render();
    showDamageText(playerUnit, totalDamage);
    playPlayerHitAnimation();

    if (monster.ability === "lifeSteal") {
      const heal = Math.ceil(totalDamage * 0.5);
      monster.hp = Math.min(monster.maxHp, monster.hp + heal);
      setMessage(`${monster.name} 흡혈. ${heal} HP를 회복했습니다.`);
      render();
      await sleep(650);
    } else if (monster.ability === "deathSentence" && player.hp > 0 && player.hp <= getPlayerMaxHp() * 0.2) {
      player.hp = 0;
      setMessage(`${monster.name}의 사형선고. 플레이어가 처형되었습니다.`);
      render();
      await sleep(650);
    } else {
      await sleep(520);
    }

    if (player.hp <= 0) {
      break;
    }
  }

  render();

  if (player.hp <= 0) {
    endGame();
    return;
  }

  await applyPlayerTurnStatusDamage();
  if (player.hp <= 0) {
    endGame();
    return;
  }

  await sleep(500);
  state.turn = "player";
  state.stunnedMonsterIndex = null;
  state.potionUsedThisTurn = false;
  state.turnAtkPotionBonus = 0;
  setMessage("플레이어 턴. 공격할 몬스터를 선택하세요.");
  render();
}

function handleMonsterDeath(monster) {
  if (monster.ability !== "split") {
    return;
  }

  const splitSlimes = [
    { id: "splitSlime", name: "분열 슬라임", hp: 20, maxHp: 20, attack: 5, sprite: "slime", small: true, chapter: 1 },
    { id: "splitSlime", name: "분열 슬라임", hp: 20, maxHp: 20, attack: 5, sprite: "slime", small: true, chapter: 1 }
  ];
  state.monsters.push(...splitSlimes);
  setMessage("킹 슬라임이 쓰러지며 작은 슬라임 2마리로 분열했습니다.");
  render();
}

function applyFocusAttackGrowth(monster) {
  if (monster.ability !== "focusAttack") {
    return [];
  }

  monster.focusBonus = Math.min(6, (monster.focusBonus || 0) + 2);
  monster.attack = (monster.baseAttack || monster.attack) + monster.focusBonus;
  return [{
    text: `+${monster.focusBonus} 집중`,
    message: `${monster.name}의 집중 사격. 공격력이 ${monster.attack}이 되었습니다.`,
    type: "focus"
  }];
}

function applyBerserk(monster) {
  if (monster.ability !== "berserk") {
    return [];
  }

  const baseAttack = monster.baseAttack || monster.attack;
  const previousAttack = monster.attack;
  monster.attack = monster.hp <= monster.maxHp * 0.5
    ? Math.ceil(baseAttack * 1.5)
    : baseAttack;
  if (monster.attack === previousAttack || monster.attack === baseAttack) {
    return [];
  }

  return [{
    text: "폭주",
    message: `${monster.name}이 폭주했습니다. 공격력이 ${monster.attack}으로 증가했습니다.`,
    type: "power"
  }];
}

function applyMonsterStartEffect(monster) {
  const effects = [];
  if (monster.ability === "lavaBlood") {
    const beforeHp = monster.hp;
    monster.hp = Math.min(monster.maxHp, monster.hp + 10);
    if (monster.hp > beforeHp) {
      effects.push({
        text: `+${monster.hp - beforeHp} HP`,
        message: `${monster.name}의 용암혈류. HP를 ${monster.hp - beforeHp} 회복했습니다.`,
        type: "heal"
      });
    }
  }

  if (monster.ability === "overheat") {
    monster.overheatCount = (monster.overheatCount || 0) + 1;
    if (monster.overheatCount % 3 === 0) {
      monster.attack += 3;
      effects.push({
        text: "과열 +3 AT",
        message: `${monster.name}의 과열. 공격력이 +3 증가했습니다.`,
        type: "power"
      });
    }
  }

  if (monster.ability === "deathCommand") {
    let buffCount = 0;
    state.monsters.forEach((ally) => {
      if (ally.hp > 0 && ally !== monster) {
        ally.attack += 3;
        buffCount += 1;
      }
    });
    if (buffCount > 0) {
      effects.push({
        text: "지휘 +3 AT",
        message: `${monster.name}의 사령 지휘. 아군 ${buffCount}명의 공격력이 +3 증가했습니다.`,
        type: "focus"
      });
    }
  }

  if (monster.ability === "darkBlessing") {
    let healCount = 0;
    state.monsters.forEach((ally) => {
      if (ally.hp > 0) {
        const beforeHp = ally.hp;
        ally.hp = Math.min(ally.maxHp, ally.hp + 7);
        if (ally.hp > beforeHp) {
          healCount += 1;
        }
      }
    });
    if (healCount > 0) {
      effects.push({
        text: `축복 +${healCount}`,
        message: `${monster.name}의 타락한 축복. 아군 ${healCount}명이 회복했습니다.`,
        type: "heal"
      });
    }
  }

  return effects;
}

function showTraitEffect(monsterIndex, text, type = "power") {
  const card = monsterList.children[monsterIndex];
  if (!card) {
    return;
  }

  card.classList.remove("trait-activated", "trait-activated-power", "trait-activated-heal", "trait-activated-focus");
  void card.offsetWidth;
  card.classList.add("trait-activated", `trait-activated-${type}`);

  const badge = document.createElement("span");
  badge.className = `trait-effect-badge ${type}`;
  badge.textContent = text;
  card.appendChild(badge);

  window.setTimeout(() => {
    badge.remove();
    card.classList.remove("trait-activated", `trait-activated-${type}`);
  }, 920);
}

function getMonsterHitCount(monster) {
  if (monster.ability === "doubleAttack" && Math.random() < 0.25) {
    return 2;
  }

  return 1;
}

function applyMonsterAttackEffect(monster) {
  if (monster.ability === "burnSlime" && Math.random() < 0.3) {
    state.burnTurns = 2;
    state.healReductionTurns = 2;
  }

  if (monster.ability === "scorpionBurn") {
    state.burnTurns = 2;
    state.healReductionTurns = 2;
  }

  if (monster.ability === "poisonSting" && Math.random() < 0.3) {
    state.poisonTurns = 2;
  }

  if (monster.ability === "ashPowder") {
    state.playerAttackPenalty = Math.min(getPlayerBaseAttack() - 1, state.playerAttackPenalty + 2);
  }

  if (monster.ability === "weakeningGrip") {
    state.playerAttackPenalty = Math.min(getPlayerBaseAttack() - 1, state.playerAttackPenalty + 5);
  }
}

function tryReviveMonster(monster) {
  if (monster.ability !== "undyingRitual" || monster.revived) {
    return false;
  }

  monster.revived = true;
  monster.hp = 90;
  monster.maxHp = Math.max(monster.maxHp, 180);
  monster.attack = 50;
  return true;
}

async function applyPlayerTurnStatusDamage() {
  let statusDamage = 0;

  if (state.burnTurns > 0) {
    statusDamage += 3;
    state.burnTurns -= 1;
  }

  if (state.poisonTurns > 0) {
    statusDamage += 2;
    state.poisonTurns -= 1;
  }

  if (state.healReductionTurns > 0) {
    state.healReductionTurns -= 1;
  }

  if (statusDamage <= 0) {
    return;
  }

  player.hp = Math.max(0, player.hp - statusDamage);
  render();
  showDamageText(playerUnit, statusDamage);
  setMessage(`상태 이상으로 ${statusDamage} 데미지를 받았습니다.`);
  await sleep(650);
}

function registerCodex(monster) {
  const id = monster.id || monster.sprite;
  if (monsterInfo[id]) {
    state.codex.add(id);
  }
}

function grantMonsterRewards(monster) {
  const coins = getMonsterCoinReward(monster);
  state.coins += coins;

  const potion = rollPotionReward();
  if (potion) {
    addPotion(potion.id);
    setMessage(`${monster.name} 처치. 코인 ${coins}개와 ${potion.name}을 획득했습니다.`);
  } else {
    setMessage(`${monster.name} 처치. 코인 ${coins}개를 획득했습니다.`);
  }

  updateMainStats();
}

function getMonsterCoinReward(monster) {
  const statReward = Math.round((monster.maxHp || monster.hp) / 20 + monster.attack / 2);
  return Math.max(1, statReward) + (monster.boss ? 5 : 0);
}

function rollPotionReward() {
  if (Math.random() >= 0.1) {
    return null;
  }

  const roll = Math.random();
  return potionRewards.find((potion) => roll < potion.threshold) || potionRewards[potionRewards.length - 1];
}

function playMonsterAttackAnimation(attackerIndex) {
  return new Promise((resolve) => {
    const attackerCard = monsterList.children[attackerIndex];
    const monster = state.monsters[attackerIndex];
    if (!attackerCard || !monster) {
      resolve();
      return;
    }

    const img = attackerCard.querySelector(".monster-body img");
    const spriteSet = sprites[monster.sprite];
    const monsterRect = attackerCard.getBoundingClientRect();
    const playerRect = playerUnit.getBoundingClientRect();
    const dashX = playerRect.right - monsterRect.left - monsterRect.width * 0.35;

    attackerCard.style.setProperty("--monster-dash-x", `${Math.min(-120, dashX)}px`);
    attackerCard.classList.remove("monster-attacking");
    void attackerCard.offsetWidth;
    img.src = spriteSet.attack;
    attackerCard.classList.add("monster-attacking");

    window.setTimeout(resolve, 430);
    window.setTimeout(() => {
      attackerCard.classList.remove("monster-attacking");
      img.src = getMonsterSprite(monster, attackerIndex, spriteSet);
    }, 760);
  });
}

function playPlayerHitAnimation() {
  playerUnit.classList.remove("player-hit");
  void playerUnit.offsetWidth;
  playerUnit.classList.add("player-hit");
  window.setTimeout(() => {
    playerUnit.classList.remove("player-hit");
  }, 380);
}

function showDamageText(targetElement, damage) {
  const damageText = document.createElement("span");
  damageText.className = "damage-text";
  damageText.textContent = `-${damage}`;
  targetElement.appendChild(damageText);
  window.setTimeout(() => {
    damageText.remove();
  }, 950);
}

function endGame() {
  state.gameOver = true;
  setMessage("게임 오버. 다시 시도하거나 메인 화면으로 돌아가세요.");
  playerSprite.src = sprites.player.down1;
  render();
  window.setTimeout(() => {
    playerSprite.src = sprites.player.down2;
    gameOverOverlay.classList.remove("hidden");
  }, 900);
}

function retryCurrentStage() {
  clearQuestionTimer();
  state.gameOver = false;
  gameOverOverlay.classList.add("hidden");
  playerUnit.classList.remove("down");
  playerSprite.src = sprites.player.idle;
  showScreen("battle");
  loadStage(state.stage);
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function clearStage() {
  const clearedStage = state.stage;
  const equipmentReward = grantStageEquipmentReward(clearedStage);
  state.clearedStages.add(clearedStage);
  state.nextStage = Math.min(stageMonsterData.length + 1, Math.max(state.nextStage, clearedStage + 1));
  syncPlayerStats();
  player.hp = getPlayerMaxHp();
  victoryText.textContent = equipmentReward
    ? `테마 ${getStageLabel(clearedStage)} 클리어 · ${equipmentReward.name} 획득`
    : `\ud14c\ub9c8 ${getStageLabel(clearedStage)} \ud074\ub9ac\uc5b4`;
  victoryNextButton.disabled = state.nextStage > stageMonsterData.length;
  victoryNextButton.textContent = state.nextStage > stageMonsterData.length
    ? "\ub2e4\uc74c \ud14c\ub9c8 \uc900\ube44\uc911"
    : `\ud14c\ub9c8 ${getStageLabel(state.nextStage)} \uac00\uae30`;
  renderChapterMap();
  updateMainStats();
  showScreen("victory");
}

function grantStageEquipmentReward(stageIndex) {
  if (state.claimedStageRewards.has(stageIndex)) {
    return null;
  }

  const rewardId = stageEquipmentRewards[stageIndex - 1];
  const item = equipmentData[rewardId];
  if (!item) {
    return null;
  }

  state.claimedStageRewards.add(stageIndex);
  if (!state.inventory.includes(item.id)) {
    state.inventory.push(item.id);
  }

  return item;
}

function setMessage(text) {
  message.textContent = text;
}

window.unlockAllCheat = function unlockAllCheat() {
  chapters
    .filter((chapter) => chapter.implemented)
    .forEach((chapter) => {
      for (let stageNumber = 1; stageNumber <= 3; stageNumber += 1) {
        const stageIndex = getStageIndex(chapter.number, stageNumber);
        if (stageIndex <= stageMonsterData.length) {
          state.clearedStages.add(stageIndex);
          state.claimedStageRewards.add(stageIndex);
        }
      }
    });

  state.nextStage = stageMonsterData.length + 1;
  state.codex = new Set(Object.keys(monsterInfo));
  state.inventory = Object.keys(equipmentData);
  potionRewards.forEach((potion) => {
    state.potions[potion.id] = Math.max(state.potions[potion.id] || 0, 5);
  });
  state.coins = Math.max(state.coins, 999);
  syncPlayerStats();
  renderChapterMap();
  renderEquipment();
  updateMainStats();
  setMessage("치트 적용: 모든 도감, 장비, 스테이지가 해금되었습니다.");
  return "모든 도감, 장비, 스테이지 해금 완료";
};

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", () => showMainScreen(getHighestClearedStage()));
retryButton.addEventListener("click", retryCurrentStage);
mainButton.addEventListener("click", () => showMainScreen(getHighestClearedStage()));
mainHomeButton.addEventListener("click", () => showMainScreen(Math.max(0, state.nextStage - 1)));
nextStageButton.addEventListener("click", enterNextStage);
victoryMainButton.addEventListener("click", () => showMainScreen(state.stage));
victoryNextButton.addEventListener("click", enterNextStage);
returnHubButton.addEventListener("click", () => showMainView("hub"));
shopButton.addEventListener("click", () => showMainView("shop"));
codexButton.addEventListener("click", () => showMainView("codex"));
equipmentButton.addEventListener("click", () => showMainView("equipment"));
document.querySelectorAll("[data-back-main]").forEach((button) => {
  button.addEventListener("click", () => showMainView("hub"));
});

difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => selectDifficulty(button.dataset.difficulty));
});

answerForm.addEventListener("submit", submitAnswer);
showHome();
