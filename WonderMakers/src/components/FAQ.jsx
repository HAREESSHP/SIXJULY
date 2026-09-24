import { useState, useEffect, useRef } from 'react'
import './FAQ.css'

const FAQ_DATA = [
  {
    id: 'good-fit',
    question: 'What kinds of projects are a good fit for Wonder Makers?',
    answer:
      "We specialize in high-impact digital products and experiences — from flagship brand websites and immersive digital platforms to complex SaaS applications and intelligent AI-driven interfaces. If your project demands thoughtful creative direction, technical excellence, and exceptional craft, we're an ideal partner.",
  },
  {
    id: 'typical-cost',
    question: 'What does a project like this typically cost?',
    answer:
      'Our engagements vary based on scope, technical complexity, and timeline. A focused Direction Sprint starts at a fixed, transparent rate, while comprehensive end-to-end design and development projects are scoped specifically to your business goals. We provide clear, itemized proposals with zero hidden costs.',
  },
  {
    id: 'pricing-models',
    question: 'How do you approach pricing and project models?',
    answer:
      'We offer two collaborative models: fixed-scope delivery with clear milestones and defined deliverables, and embedded senior teams on flexible engagements for scaling product teams. Both models emphasize predictability, transparent communication, and senior-led accountability.',
  },
  {
    id: 'tight-deadline',
    question: "We're working with a tight deadline – how fast can you move?",
    answer:
      'Because our studio is entirely senior-led with zero agency bureaucracy or junior handoffs, we can move with speed and precision. A Direction Sprint delivers tangible concepts in 2 to 3 weeks, and we can assemble focused engineering pods rapidly for critical deadlines.',
  },
  {
    id: 'senior-team',
    question: 'Will we actually work with the senior team we meet at the start?',
    answer:
      'Yes, absolutely. We intentionally stay focused and boutique. The senior strategists, art directors, and full-stack engineers you collaborate with during kickoff are the exact experts who conceptualize, design, and build your product every single day.',
  },
  {
    id: 'team-structure',
    question: 'How is your team structured, and how do you handle international collaboration?',
    answer:
      'We operate as senior-led cross-functional pods consisting of a lead strategist, product designer, and senior engineers. Spanning multiple hubs and time zones across 4 continents, we run asynchronous-first workflows with regular video checkpoints, ensuring continuous momentum and clear, high-touch communication.',
  },
  {
    id: 'internal-team',
    question: 'Can you work alongside our internal team?',
    answer:
      'Yes. Many of our engagements are hybrid collaborations. We integrate directly into your Slack, Figma, and GitHub environments, pairing with your in-house product managers, designers, and engineers to accelerate delivery, establish design systems, or take full ownership of specialized features.',
  },
  {
    id: 'clear-brief',
    question: "We don't have a clear brief yet – can we still start?",
    answer:
      "Absolutely. In fact, that's what our Direction Sprint is designed for. We help you untangle ambiguity, benchmark competitors, validate core technical feasibility, and crystallize your vision into a sharp, actionable product roadmap and interactive prototype before committing to full build.",
  },
  {
    id: 'shape-product',
    question: 'Do you help shape the product, or mainly execute on briefs?',
    answer:
      'We act as strategic partners, not ticket-takers. We challenge assumptions, bring fresh product thinking, uncover untapped opportunities, and co-create solutions with you. Every design and architecture decision is rooted in your business objectives and user behavior.',
  },
  {
    id: 'complex-scale',
    question: 'Is your team experienced enough to handle complex, large-scale technical projects?',
    answer:
      'Yes. Our senior engineers have built enterprise-grade platforms, high-throughput Web3 protocols, AI-integrated workflows, and custom 3D/WebGL experiences handling millions of users. We architect for performance, security, scalability, and maintainability from day one.',
  },
  {
    id: 'ai-approach',
    question: 'How do you approach AI in your work?',
    answer:
      'We view AI as both a design superpower and an engineering discipline. We build AI-native interfaces, multimodal experiences, and intelligent assistant workflows that go beyond novelty to solve genuine user problems, while using state-of-the-art AI tooling internally to streamline delivery.',
  },
  {
    id: 'after-launch',
    question: 'What happens after launch?',
    answer:
      'We do not disappear at launch. We provide post-launch warranty support, analytics monitoring, performance tuning, and seamless handoff documentation for your team. We also partner on ongoing evolution sprints to iterate, test, and scale your product post-launch.',
  },
]

function FAQ() {
  const [openId, setOpenId] = useState(null)
  const listRef = useRef(null)

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  useEffect(() => {
    if (!listRef.current) return

    const items = listRef.current.querySelectorAll('.wm-faq-item')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="wm-faq-section" id="faq">
      <div className="wm-faq-container">
        <h2 className="wm-faq-heading">FAQ</h2>

        <div
          ref={listRef}
          className="wm-faq-list"
          role="region"
          aria-label="Frequently Asked Questions"
        >
          {FAQ_DATA.map((item, index) => {
            const isOpen = openId === item.id
            return (
              <div
                key={item.id}
                style={{ '--card-idx': index }}
                className={`wm-faq-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="wm-faq-trigger"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <span className="wm-faq-question">{item.question}</span>
                  <span className="wm-faq-icon" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="wm-faq-svg"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  className="wm-faq-answer-collapse"
                  role="region"
                >
                  <div className="wm-faq-answer-inner">
                    <p className="wm-faq-answer-text">{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
