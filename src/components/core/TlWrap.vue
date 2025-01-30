<template>
    <div class="timeline-container">
      <h4 class="tl-title">{{ title }}</h4>
      <div 
        v-for="(item, index) in timelineItems" 
        :key="index" 
        class="timeline-item"
      >
        <!-- Timeline connector line -->
        <div class="timeline-line">
          <div class="line"></div>
          <div class="dot"></div>
        </div>
        
        <!-- Content block -->
        <div class="timeline-content">
          <div class="date">{{ item.date }}</div>
          <div class="title">{{ item.title }}</div>
          <div class="description">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VerticalTimeline',
    props: {
      title: {
        type: String,
      },
      timelineItems: {
        type: Array,
        required: true,
        default: () => []
      }
    }
  }
  </script>
  
  <style scoped>
  .tl-title {
    margin: 0px 40px 5px;
  }

  .timeline-container {
    padding: 20px;
    max-width: 800px;
    margin: 10px auto;
    border: 1px dashed black;
    border-radius: 14px;
    background-color: var(--color-background-soft);
  }
  
  .timeline-item {
    display: flex;
    margin-bottom: 30px;
    position: relative;
  }
  
  .timeline-line {
    position: relative;
    width: 40px;
    margin-right: 20px;
  }
  
  .line {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: calc(100% + 30px);
    background-color: #e2e8f0;
  }
  
  .dot {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #3b82f6;
    border: 2px solid #fff;
    z-index: 1;
  }
  
  .timeline-content {
    flex: 1;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .date {
    font-size: 0.875rem;
    color: #64748b;
    margin-bottom: 8px;
  }
  
  .title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 8px;
  }
  
  .description {
    color: #475569;
    line-height: 1.5;
  }
  
  .timeline-container:last-child .timeline-item:last-child .line {
    height: 0;
  }

  .timeline-item:last-child .line {
    height: calc(100% + 30px + 20px);
  }

  h4 + .timeline-item .line {
    height: calc(100% + 100px);
    top: -60px;
  }

  h3 + .timeline-container h4+.timeline-item .line {
    top: unset;
  }

  </style>