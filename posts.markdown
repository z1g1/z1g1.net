---
title: All Posts
layout: archive
---


  
{% for post in site.posts %}
  <!-- Post Title with Link -->
  <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>

  <!-- Post Date -->
  <p>{{ post.date | date: "%Y-%m-%d" }}</p>

  <!-- Image and Excerpt -->
  <div style="display: flex; align-items: flex-start; margin-bottom: 1em;">
    {% if post.header.image %}
      <!-- Post Image -->
      <img src="{{ post.header.image }}" alt="Image for {{ post.title }}" style="max-width: 200px; margin-right: 1em; float: left; border-radius: 5px;">
    {% endif %}

    <!-- Post Excerpt -->
    <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
  </div>

  <!-- Horizontal Rule -->
  <hr>
{% endfor %}
