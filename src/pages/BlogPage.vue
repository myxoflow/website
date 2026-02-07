<template>
  <div class="blog-page">
    <section class="blog-hero">
      <div class="container">
        <p class="hero-kicker">MyxoFlow Journal</p>
        <h1>Field Notes From the Decentralized Edge</h1>
        <p class="hero-subtitle">
          Tactical insights on supply chain orchestration, freelancer networks, and building
          resilient operations.
        </p>
      </div>
    </section>

    <section class="featured-post">
      <div class="container">
        <div class="featured-card">
          <div class="featured-content">
            <p class="tag">Featured</p>
            <h2>{{ featured.title }}</h2>
            <p class="excerpt">{{ featured.excerpt }}</p>
            <div class="meta">
              <span>{{ featured.date }}</span>
              <span>•</span>
              <span>{{ featured.readTime }}</span>
            </div>
          </div>
          <div class="featured-visual">
            <div class="visual-orb"></div>
            <p>{{ featured.topic }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="posts-grid">
      <div class="container">
        <div class="grid">
          <article v-for="post in posts" :key="post.title" class="post-card">
            <div class="post-header">
              <span class="post-topic">{{ post.topic }}</span>
              <span class="post-date">{{ post.date }}</span>
            </div>
            <h3>{{ post.title }}</h3>
            <p>{{ post.excerpt }}</p>
            <div class="post-footer">
              <span>{{ post.readTime }}</span>
              <span class="cta">Read draft</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const featured = {
  title: 'Why Decentralized Ops Win in Volatile Markets',
  excerpt:
    'Centralized models buckle under latency, cost inflation, and talent drain. Here is how a modular network keeps execution resilient without the overhead.',
  date: 'Feb 07, 2026',
  readTime: '6 min read',
  topic: 'Network Design',
}

const posts = [
  {
    title: 'Designing a 30-Day Deployment Engine',
    excerpt:
      'We break the timeline into four repeatable phases that compress scope, talent, and delivery without cutting corners.',
    date: 'Jan 28, 2026',
    readTime: '5 min read',
    topic: 'Operations',
  },
  {
    title: 'Pricing Without the Middlemen Tax',
    excerpt:
      'A transparent pricing stack lets clients predict spend while rewarding the best operators with real margins.',
    date: 'Jan 20, 2026',
    readTime: '4 min read',
    topic: 'Strategy',
  },
  {
    title: 'The Freelance Advantage in Supply Chain Resilience',
    excerpt:
      'How on-demand specialists outperform static vendor rosters in fast-moving, multi-region programs.',
    date: 'Jan 12, 2026',
    readTime: '7 min read',
    topic: 'Talent',
  },
]
</script>

<style scoped lang="scss">
.blog-page {
  color: #e2e8f0;
}

.blog-hero {
  padding: 5rem 0 3rem;
  background: radial-gradient(circle at 20% 20%, rgba(14, 165, 233, 0.25), transparent 55%),
    radial-gradient(circle at 80% 10%, rgba(34, 197, 94, 0.2), transparent 50%);
}

.hero-kicker {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  color: #94a3b8;
}

.hero-subtitle {
  max-width: 600px;
  color: #cbd5f5;
  margin-top: 0.75rem;
}

.featured-post {
  padding: 1rem 0 3rem;
}

.featured-card {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 2rem;
  background: rgba(15, 23, 42, 0.8);
  border-radius: 2rem;
  padding: 2rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.featured-content .tag {
  display: inline-block;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.2);
  color: #7dd3fc;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.7rem;
  margin-bottom: 1rem;
}

.featured-content h2 {
  margin: 0 0 1rem;
}

.featured-content .excerpt {
  color: #cbd5f5;
  line-height: 1.6;
}

.featured-content .meta {
  display: flex;
  gap: 0.75rem;
  color: #94a3b8;
  font-size: 0.85rem;
  margin-top: 1.5rem;
}

.featured-visual {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9));
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  color: #e2e8f0;
}

.visual-orb {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.8), rgba(14, 165, 233, 0.1));
  box-shadow: 0 0 40px rgba(56, 189, 248, 0.4);
}

.posts-grid {
  padding: 0 0 4rem;
}

.grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.post-card {
  background: rgba(15, 23, 42, 0.7);
  border-radius: 1.25rem;
  padding: 1.5rem;
  border: 1px solid rgba(148, 163, 184, 0.15);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.post-card:hover {
  transform: translateY(-6px);
  border-color: rgba(56, 189, 248, 0.4);
}

.post-header {
  display: flex;
  justify-content: space-between;
  color: #94a3b8;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.post-card h3 {
  margin: 0;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #94a3b8;
  font-size: 0.85rem;
}

.cta {
  color: #7dd3fc;
  font-weight: 600;
}

@media (max-width: 900px) {
  .featured-card {
    grid-template-columns: 1fr;
  }
}
</style>
