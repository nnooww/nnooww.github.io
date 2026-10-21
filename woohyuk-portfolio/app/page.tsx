"use client";

import { useState } from "react";

const EMAIL = "woohyuk080904@gmail.com";

const qualifications = [
  { name: "ITQ 아래한글", issuer: "KPC", date: "2024.06.27" },
  { name: "ITQ 한글엑셀", issuer: "KPC", date: "2025.07.23" },
  { name: "ITQ 한글파워포인트", issuer: "KPC", date: "2026.07.02" },
  { name: "정보기기운용기능사", issuer: "한국산업인력공단", date: "2026.07.10" },
  { name: "ITQ OA Master", issuer: "KPC", date: "2026.07.23" },
];

const activities = [
  {
    period: "2025.09 — 현재",
    title: "SCA 전공동아리",
    role: "Web Security",
    text: "교내 CTF 웹 문제 출제와 운영, 보안 특강 및 팀 기반 웹 서비스 모의해킹 활동에 참여하고 있습니다.",
    tags: ["CTF 운영", "Web", "Security"],
  },
  {
    period: "2025.11 — 현재",
    title: "CTF Team — KTS, Dangel Donut",
    role: "CTF Team",
    text: "KTS와 Dangel Donut 소속으로 CTF에 참가해 웹 분야 문제를 분석하고, 풀이 과정과 취약점 원리를 기록하고 있습니다.",
    tags: ["KTS", "Dangel Donut", "Web"],
  },
  {
    period: "2024.11 — 현재",
    title: "Dreamhack — W0_hyuk",
    role: "Security Learning",
    text: "Dreamhack에서 웹 해킹 문제를 풀고, 풀이 과정과 새로 알게 된 내용을 Tistory에 기록하고 있습니다.",
    tags: ["Dreamhack", "Web Hacking"],
  },
];

const trackRecord = [
  {
    year: "2026",
    title: "BushBash CTF 2026",
    result: "전체 16위",
    description: "SLHR로 참가해 1,063개 등록 팀 중 전체 16위, 상위 약 1.5%",
    evidence: "bushbash-ctf-2026-result.png",
  },
  {
    year: "2026",
    title: "Athena CTF 2026",
    result: "전체 4위",
    description: "2인 팀 SLHR로 참가해 500팀 이상 중 전체 4위",
    evidence: "athena-ctf-2026-rank-4.png",
  },
  {
    year: "2026",
    title: "Hack The Box Cyber Apocalypse CTF 2026",
    result: "팀 전체 4위",
    description: "Dangel Donut 소속으로 참가해 6,744팀 중 4위, 136개 문제 전체 풀이",
    evidence: "htb-cyber-apocalypse-2026.png",
  },
  {
    year: "2025",
    title: "사이버가디언즈 CTF",
    result: "장려상, 6위",
    description: "포너블을 담당한 팀 지피티로 예선 6위 본선 진출, 본선 6위 장려상 수상",
    evidence: "cyber-guardians-2025-award.png",
  },
  {
    year: "2025",
    title: "HSPACE Club League CTF",
    result: "본선 진출",
    description: "온라인 예선을 거쳐 본선 참가",
  },
  {
    year: "2024",
    title: "교내 학과 CTF",
    result: "우수상, 4위",
    description: "미래인재 정보보안 챌린지 개인전에서 학과 내 4위로 우수상 수상",
    evidence: "school-ctf-2024-award.png",
  },
];

const education = [
  {
    period: "2026.06 — 2026.11",
    title: "현대오토에버 화이트해커 양성교육 10기",
    status: "참여 중",
    text: "정보보안 이론과 웹·네트워크 해킹을 학습하고 화이트해커 경진대회에 참여하는 교육 과정",
  },
  {
    period: "2026.07.22 — 07.30",
    title: "헌팅주니어 1기",
    status: "교육",
    text: "실전 버그바운티를 포함한 웹 해킹 과정 교육",
  },
];

const caseStudies = [
  {
    index: "01",
    title: "SCA CTF Blackbox Challenge — CAT Market",
    text: "SCA CTF에서 운영한 블랙박스 웹 문제 CAT Market을 설계 및 구현하고, 의도된 풀이 검증과 참가자 티켓 문의 대응을 맡았습니다.",
    role: "문제 설계 및 구현, 풀이 검증, 문제 티켓 문의 해결",
    state: "자료 정리 중",
  },
  {
    index: "02",
    title: "Timeticket Security Review",
    text: "SCA 팀 활동으로 진행된 웹 서비스 점검에서 입력 지점을 분석해 XSS 취약점 1건을 식별했습니다.",
    role: "XSS 테스트 및 발견 내용 정리",
    stack: ["XSS", "Burp Suite", "Web"],
    state: "공개 범위 검토 중",
  },
  {
    index: "03",
    title: "Web Security Write-ups",
    text: "CTF와 Dreamhack 웹 문제를 풀며 취약점 원인, 실패한 접근, 최종 공격 흐름을 Tistory에 기록하고 있습니다.",
    role: "문제 분석, 익스플로잇, 기술 문서 작성",
    state: "379+ posts",
    href: "https://wohyuk.tistory.com/",
  },
];

export default function Home() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main>
      <nav className="nav-shell" aria-label="주요 메뉴">
        <a className="brand mono" href="#top" aria-label="처음으로">
          CWH<span>_SEC</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#activities">Activities</a>
          <a href="#record">Record</a>
          <a href="#projects">Projects</a>
        </div>
        <button className="copy-button mono" onClick={copyEmail}>
          {copied ? "COPIED" : "COPY EMAIL"}
        </button>
      </nav>

      <header className="hero section" id="top">
        <div className="hero-status mono">
          <span className="status-dot" />
          WEB SECURITY / CTF / WRITE-UPS
        </div>
        <p className="hero-kicker mono">CHAE</p>
        <h1>
          WOO<span>HYUK</span>
        </h1>
        <div className="hero-bottom">
          <p>
            웹 보안을 공부하며 CTF와 웹 취약점 분석 활동을 이어가고 있습니다.
            <br />
            문제를 해결하는 데서 끝내지 않고, <strong>풀이 과정과 새롭게 알게 된 내용</strong>을 기록합니다.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">프로젝트 보기</a>
            <a className="button" href="https://wohyuk.tistory.com/" target="_blank" rel="noreferrer">
              Tistory ↗
            </a>
          </div>
        </div>
        <div className="scroll-cue mono">SCROLL TO EXPLORE <span>↓</span></div>
      </header>

      <section className="section about-grid" id="about">
        <div>
          <h2>About</h2>
        </div>
        <div className="about-copy">
          <p className="lead">
            안녕하세요. 웹 보안과 CTF를 중심으로 성장하고 있는
            <strong> 채우혁</strong>입니다.
          </p>
          <p>
            현재 세명컴퓨터고등학교 스마트보안솔루션과에 재학 중이며,
            전공동아리와 보안 교육 등 다양한 활동에 참여하며 경험을 쌓고 있습니다.
            CTF와 워게임 문제를 풀 때는 플래그만 기록하기보다, 풀이 과정에서
            어떤 점을 관찰했고 이를 바탕으로 어떻게 접근했는지 정리하려고 합니다.
          </p>
          <dl className="identity-list mono">
            <div><dt>FOCUS</dt><dd>WEB SECURITY / CTF</dd></div>
            <div><dt>BASED IN</dt><dd>SEOUL, KR</dd></div>
            <div><dt>STATUS</dt><dd>OPEN TO LEARNING</dd></div>
          </dl>
        </div>
      </section>

      <section className="section" id="activities">
        <div className="section-heading">
          <div>
            <h2>Activities</h2>
          </div>
        </div>
        <div className="activity-list">
          {activities.map((item) => (
            <article className="activity-row" key={item.title}>
              <p className="period mono">{item.period}</p>
              <div>
                <p className="eyebrow mono">{item.role}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <div className="tags">
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section record-section" id="record">
        <div className="section-heading">
          <div>
            <h2>Awards & Education</h2>
          </div>
        </div>
        <div className="record-layout">
          <div>
            <h3 className="column-title mono">COMPETITIONS</h3>
            {trackRecord.map((item) => {
              const content = <>
                <span className="year mono">{item.year}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
                <strong>{item.result}</strong>
              </>;
              return item.evidence ? (
                <a className="record-card evidence-card" href={item.evidence} target="_blank" rel="noreferrer" key={item.title} aria-label={`${item.title} 증빙 이미지 보기`}>
                  {content}
                </a>
              ) : <article className="record-card" key={item.title}>{content}</article>;
            })}
          </div>
          <div>
            <h3 className="column-title mono">TRAINING PROGRAMS</h3>
            {education.map((item) => (
              <article className="training-card" key={item.title}>
                <p className="period mono">{item.period}</p>
                <div className="card-line">
                  <h4>{item.title}</h4>
                  <span>{item.status}</span>
                </div>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section qualification-section">
        <div className="section-heading compact">
          <div>
            <h2>Qualifications</h2>
          </div>
        </div>
        <div className="qualification-grid">
          {qualifications.map((item, index) => (
            <article key={item.name}>
              <span className="number mono">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.name}</h3>
              <p>{item.issuer}</p>
              <time className="mono">{item.date}</time>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <div>
            <h2>Security Projects</h2>
          </div>
        </div>
        <div className="project-list">
          {caseStudies.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-number mono">{project.index}</div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.text}</p>
                <dl>
                  <div><dt>MY ROLE</dt><dd>{project.role}</dd></div>
                  {project.stack ? <div><dt>STACK</dt><dd>{project.stack.join(", ")}</dd></div> : null}
                </dl>
              </div>
              <div className="project-meta">
                <span className="mono">{project.state}</span>
                {project.href ? (
                  <a href={project.href} target="_blank" rel="noreferrer">VIEW ARCHIVE ↗</a>
                ) : (
                  <span className="muted">DETAILS SOON</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section skill-section">
        <h2>Skills</h2>
        <div className="skill-grid">
          <div><h3>Web Hacking</h3><p>XSS, SQL Injection, CSRF, SSRF, SSTI, File Upload, Authentication, Access Control, LFI, Command Injection</p></div>
          <div><h3>Tools</h3><p>Burp Suite, Nmap, Wireshark, Linux, Git, Docker</p></div>
          <div><h3>Languages</h3><p>Python, HTML, CSS, JavaScript, SQL, Java, JSP, PHP</p></div>
        </div>
      </section>

      <footer className="section contact">
        <h2>궁금한 점이 있다면<br /><span>연락해주세요.</span></h2>
        <div className="contact-row">
          <button onClick={copyEmail}>{copied ? "이메일이 복사되었습니다." : EMAIL}</button>
          <a href="https://wohyuk.tistory.com/" target="_blank" rel="noreferrer">Tistory ↗</a>
          <a href="https://dreamhack.io/users/39619" target="_blank" rel="noreferrer">Dreamhack ↗</a>
        </div>
        <div className="footer-line mono">
          <span>© 2026 CHAE WOOHYUK</span>
          <span>WEB SECURITY STUDENT</span>
        </div>
      </footer>
    </main>
  );
}
