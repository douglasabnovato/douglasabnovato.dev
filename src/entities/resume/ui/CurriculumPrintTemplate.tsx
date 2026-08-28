import { forwardRef } from 'react';

export const CurriculumPrintTemplate = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div className="cv-print-wrapper">
            <div ref={ref} className="cv-exec-document">

                {/* CABEÇALHO */}
                <header className="cv-exec-header">
                    <h1>DOUGLAS A. B. NOVATO</h1>
                    <div className="cv-exec-contacts">
                        <span><strong>Contato:</strong> (32) 98836-7667 &nbsp;|&nbsp; <strong>E-mail:</strong> <a href="mailto:douglasabnovato@gmail.com">douglasabnovato@gmail.com</a> &nbsp;|&nbsp; <strong>Localidade:</strong> Juiz de Fora - MG</span>
                        <span><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/douglasabnovato" target="_blank" rel="noreferrer">linkedin.com/in/douglasabnovato</a> &nbsp;|&nbsp; <strong>Portfólio:</strong> <a href="https://douglasabnovato-dev.vercel.app" target="_blank" rel="noreferrer">douglasabnovato-dev.vercel.app</a></span>
                    </div>
                </header>

                {/* 1. SEÇÃO OBJETIVO */}
                <section className="cv-exec-section">
                    <h2 className="cv-exec-section-title">OBJETIVO</h2>
                    <p className="cv-exec-text">
                        Atuar como <strong>Analista de Sistemas Fullstack</strong>, contribuindo no desenvolvimento e evolução de aplicações web escaláveis, integrando frontend, backend, bancos de dados e ecossistemas de software, com foco em qualidade, performance, boas práticas de engenharia e visão sistêmica de produto.
                    </p>
                </section>

                {/* 2. SEÇÃO APRESENTAÇÃO / RESUMO */}
                <section className="cv-exec-section">
                    <h2 className="cv-exec-section-title">APRESENTAÇÃO / RESUMO</h2>
                    <p className="cv-exec-text">
                        Desenvolvedor Fullstack de Produtos Digitais e Especialista em CRM Tech Growth. Trajetória contínua de 17+ anos no ecossistema de tecnologia, impulsionando o nascimento e crescimento de Unidades de Negócio através da orquestração de jornadas multicanal no Salesforce Marketing Cloud (SFMC). Minha atuação une visão estratégica de marketing à engenharia de software fullstack (Stack MERN, Vue.js, TypeScript, Laravel, Node.js e REST APIs). Experiência em desenvolvimento de e-commerce, Landing Pages de alta conversão e modelagem de bancos de dados (PostgreSQL, MySQL, MongoDB, Supabase). Atuação como Coordenador de Educação e Tecnologia na escola ByteClass e organizador de eventos tech da comunidade.
                    </p>
                </section>

                {/* 3. MATRIZ DE COMPETÊNCIAS & TECH STACK */}
                <section className="cv-exec-section">
                    <h2 className="cv-exec-section-title">MATRIZ DE COMPETÊNCIAS & TECH STACK</h2>
                    <div className="cv-exec-grid">
                        <div className="cv-exec-grid-item">
                            <strong>Frontend & Reatividade:</strong> React.js, Next.js, Vue.js 3, TypeScript, Tailwind CSS, Styled-Components, Redux, HTML5/CSS3, UX Design.
                        </div>
                        <div className="cv-exec-grid-item">
                            <strong>Backend & Arquitetura:</strong> Node.js, Express, APIs RESTful, Webhooks, Laravel (PHP), Java, C/C++, Clean Code, POO, SDLC.
                        </div>
                        <div className="cv-exec-grid-item">
                            <strong>Salesforce & CRM Tech:</strong> Salesforce SFMC, AMPscript, SSJS, SOQL, Apex, Journey Builder, CloudPages, Zenvia (WhatsApp), Constant Contact.
                        </div>
                        <div className="cv-exec-grid-item">
                            <strong>Bancos de Dados & Cloud:</strong> PostgreSQL, MySQL, MongoDB, Supabase (BaaS), Git/GitHub, Vercel, Render, AWS, Jenkins.
                        </div>
                    </div>
                </section>

                {/* 4. EXPERIÊNCIA PROFISSIONAL */}
                <section className="cv-exec-section">
                    <h2 className="cv-exec-section-title">EXPERIÊNCIA PROFISSIONAL</h2>

                    {/* BYTECLASS */}
                    <div className="cv-exec-item">
                        <div className="cv-exec-item-header">
                            <div className="cv-exec-item-title-group">
                                <span className="cv-exec-item-title">Coordenador de Educação e Tecnologia</span>
                                <span className="cv-exec-item-company"> | ByteClass - Escola de Tecnologia, Programação e Desenvolvimento</span>
                            </div>
                            <span className="cv-exec-item-date">Ago/2025 – Presente | Juiz de Fora – MG (Presencial)</span>
                        </div>
                        <ul className="cv-exec-bullets">
                            <li>Liderança da estrutura pedagógica, técnica e operacional da escola, definindo metodologias de ensino e criando trilhas de formação Fullstack (MERN, Vue, Node, SQL).</li>
                            <li>Instrução técnica e mentoria prática em aulas presenciais e transmissões ao vivo, aplicando Clean Code, code review e programação em pares.</li>
                            <li>Supervisão de plataformas de ensino, criação de Landing Pages de conversão e gestão de indicadores de retenção/sucesso do aluno (CS).</li>
                        </ul>
                    </div>

                    {/* FREELANCE */}
                    <div className="cv-exec-item">
                        <div className="cv-exec-item-header">
                            <div className="cv-exec-item-title-group">
                                <span className="cv-exec-item-title">Desenvolvedor de Produtos Digitais (Fullstack)</span>
                                <span className="cv-exec-item-company"> | Freelance / Projetos Independentes (Volta Express Brasil)</span>
                            </div>
                            <span className="cv-exec-item-date">Mar/2021 – Presente | Remoto (5+ Anos)</span>
                        </div>
                        <ul className="cv-exec-bullets">
                            <li>Engenharia de soluções digitais sob medida para PMEs na área de logística (Volta Express) e educação, utilizando Stack MERN e TypeScript.</li>
                            <li>Modelagem de bancos de dados relacionais e NoSQL (PostgreSQL, MySQL, MongoDB, Supabase) e APIs RESTful integradas a pagamentos e CRMs.</li>
                            <li>Consultoria de produto (MVPs com foco em Pareto 80/20) e deploy automatizado em ambientes de nuvem (Vercel, Render, Supabase e AWS).</li>
                        </ul>
                    </div>

                    {/* GRUPO MYSA */}
                    <div className="cv-exec-item">
                        <div className="cv-exec-item-header">
                            <div className="cv-exec-item-title-group">
                                <span className="cv-exec-item-title">Tech Growth em CRM | Salesforce Developer</span>
                                <span className="cv-exec-item-company"> | Grupo MYSA S.A. (ABC da Construção & Casa Dexco)</span>
                            </div>
                            <span className="cv-exec-item-date">Fev/2025 – Fev/2026 | Juiz de Fora – MG (Híbrido)</span>
                        </div>
                        <ul className="cv-exec-bullets">
                            <li>Estruturação de jornadas multicanal complexas no Salesforce Marketing Cloud (Automation Studio e Journey Builder) para clientes, franqueados e especificadores.</li>
                            <li>Desenvolvimento de CloudPages, consultas avançadas em SQL/SOQL, scripts AMPscript e SSJS, e conectores via REST APIs.</li>
                        </ul>
                    </div>

                    {/* ABC DA CONSTRUÇÃO */}
                    <div className="cv-exec-item">
                        <div className="cv-exec-item-header">
                            <div className="cv-exec-item-title-group">
                                <span className="cv-exec-item-title">Growth Hacker</span>
                                <span className="cv-exec-item-company"> | ABC da Construção S.A.</span>
                            </div>
                            <span className="cv-exec-item-date">Jul/2023 – Jun/2025 | Juiz de Fora – MG (Híbrido)</span>
                        </div>
                        <ul className="cv-exec-bullets">
                            <li>Estruturação de jornadas multicanal (WhatsApp via Zenvia e E-mail Marketing via Constant Contact) e higienização de bases de dados.</li>
                            <li>Manutenção e evolução front-end do e-commerce na plataforma Wake com HTML5, CSS3 e JavaScript.</li>
                        </ul>
                    </div>

                    {/* JAMBOO */}
                    <div className="cv-exec-item">
                        <div className="cv-exec-item-header">
                            <div className="cv-exec-item-title-group">
                                <span className="cv-exec-item-title">Desenvolvedor Frontend</span>
                                <span className="cv-exec-item-company"> | Jamboo</span>
                            </div>
                            <span className="cv-exec-item-date">Nov/2022 – Fev/2023 | Juiz de Fora – MG</span>
                        </div>
                        <ul className="cv-exec-bullets">
                            <li>Desenvolvimento de interfaces de fidelidade e e-commerce em React.js, TypeScript, Tailwind CSS e styled-components integradas a APIs REST via JSON.</li>
                        </ul>
                    </div>

                    {/* NVOIP */}
                    <div className="cv-exec-item">
                        <div className="cv-exec-item-header">
                            <div className="cv-exec-item-title-group">
                                <span className="cv-exec-item-title">Analista de Desenvolvimento de Sistemas</span>
                                <span className="cv-exec-item-company"> | Nvoip</span>
                            </div>
                            <span className="cv-exec-item-date">Dez/2020 – Ago/2021 | Juiz de Fora – MG</span>
                        </div>
                        <ul className="cv-exec-bullets">
                            <li>Desenvolvimento da plataforma VoIP utilizando ReactJS, Redux e Hooks integrados a backend Java e MariaDB.</li>
                        </ul>
                    </div>
                </section>

                {/* 5. FORMAÇÃO ACADÊMICA */}
                <section className="cv-exec-section">
                    <h2 className="cv-exec-section-title">FORMAÇÃO ACADÊMICA</h2>

                    <div className="cv-exec-academic-item">
                        <div className="cv-exec-academic-main">
                            <span className="cv-exec-academic-course">Análise e Desenvolvimento de Sistemas (BTech)</span>
                            <span className="cv-exec-academic-institution"> — Faculdade Estácio de Sá</span>
                        </div>
                        <div className="cv-exec-academic-meta">
                            <span className="cv-exec-item-date">Fev/2023 – Jul/2025 (Concluído)</span>
                            <p className="cv-exec-academic-focus">Projetar, documentar, especificar, testar, implementar e manter sistemas/softwares.</p>
                        </div>
                    </div>

                    <div className="cv-exec-academic-item">
                        <div className="cv-exec-academic-main">
                            <span className="cv-exec-academic-course">Técnico em Informática (Desenvolvimento Web)</span>
                            <span className="cv-exec-academic-institution"> — IF Sudeste MG / Campus Juiz de Fora</span>
                        </div>
                        <div className="cv-exec-academic-meta">
                            <span className="cv-exec-item-date">2016 – 2017 (Concluído)</span>
                            <p className="cv-exec-academic-focus">Foco: Desenvolvimento Web, Segurança da Informação, Algoritmos e Web Design Responsivo.</p>
                        </div>
                    </div>

                    <div className="cv-exec-academic-item">
                        <div className="cv-exec-academic-main">
                            <span className="cv-exec-academic-course">Bacharelado em Ciência da Computação</span>
                            <span className="cv-exec-academic-institution"> — Universidade Federal de Juiz de Fora (UFJF)</span>
                        </div>
                        <div className="cv-exec-academic-meta">
                            <span className="cv-exec-item-date">2008 – 2015 (Cursados 4 de 8 períodos)</span>
                            <p className="cv-exec-academic-focus">Bolsista de Pesquisa e Atleta do ICE. Foco: Algoritmos, Estrutura de Dados e Bancos de Dados.</p>
                        </div>
                    </div>
                </section>

                {/* 6. CERTIFICAÇÕES */}
                <section className="cv-exec-section">
                    <h2 className="cv-exec-section-title">LICENÇAS & CERTIFICADOS EMITIDOS</h2>
                    <ul className="cv-exec-bullets">
                        <li><strong>API Rest com Laravel 9 (Eloquent ORM, Controllers, Models):</strong> Udemy — Emitido em Mar/2023</li>
                        <li><strong>React + Redux (TypeScript, Next.js, Node, Express, MongoDB):</strong> Cod3r — Emitido em Jun/2021</li>
                        <li><strong>Networking, Oratória, Comunicação Assertiva & Pitch Criativo:</strong> Sólides — Emitido em Ago/2019</li>
                        <li><strong>Na Prática Online (Produtividade & Decisão de Carreira):</strong> Fundação Estudar — Emitido em Ago/2018</li>
                    </ul>
                </section>

                {/* 7. COMUNIDADE */}
                <section className="cv-exec-section">
                    <h2 className="cv-exec-section-title">COMUNIDADE, LIDERANÇA & VOLUNTARIADO</h2>
                    <ul className="cv-exec-bullets">
                        <li><strong>DevOpsDays Juiz de Fora (2026):</strong> Coorganizador do evento regional de tecnologia e cultura DevOps.</li>
                        <li><strong>CodeJr (Empresa Júnior de Computação - UFJF):</strong> Diretor de Qualidade & Analista (Jul/2014 – Fev/2016) — Auditoria de código e certificação ISO.</li>
                        <li><strong>AIESEC Juiz de Fora:</strong> Finanças, Comunicação em Marketing e Vendas B2B (Mai/2010 – Set/2011) — Captação e negociação B2B.</li>
                    </ul>
                </section>

                {/* 8. IDIOMAS */}
                <section className="cv-exec-section">
                    <h2 className="cv-exec-section-title">IDIOMAS</h2>
                    <p className="cv-exec-text">
                        <strong>• Inglês:</strong> Professional Working (Fluente técnico para leitura, escrita e conversação profissional) &nbsp;&nbsp;|&nbsp;&nbsp;
                        <strong>• Espanhol:</strong> Elementary (Básico)
                    </p>
                </section>

            </div>
        </div>
    );
});

CurriculumPrintTemplate.displayName = 'CurriculumPrintTemplate';