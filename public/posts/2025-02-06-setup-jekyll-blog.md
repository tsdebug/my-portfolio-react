---
layout: default
title: "SetUp Jekyll Blog"
date: 2025-02-06
description: "This post is about how I was able to set up my Jekyll blog using Jekyll + GitHub-pages. It's from a perception of a person new to Jekyll."
author: "Tanushree Shaw"
---
# How I Set Up My Jekyll Blog

![GitHub + Jekyll](/blogs/assets/GitHub+Jekyll.png)

## Why I Chose Jekyll + GitHub Pages

When I decided to add a blog to my portfolio, I wanted something **free, and easy to manage**. Jekyll + GitHub Pages turned out to be the perfect combo because:
- It **works directly with GitHub**, meaning no extra hosting setup.
- I can write my blogs in **Markdown**, keeping things simple.
- It’s **fully customizable** to match my portfolio design.
- I was able to skip the process of installation of different things.

## Steps I Followed to Set Up My Jekyll Blog

### 1. Created a New Repository
I created a new **GitHub repository** named `blogs` to store all my blog content.

![Create new repo](/blogs/assets/Create%20new%20repo.png)

### 2. Enabled GitHub Pages
I went to **Settings → Pages**, set the **branch to deploy**, and GitHub Pages (which plays a major role) was activated.

![Enable GitHub Pages](/blogs/assets/Set%20github%20pages.png)

### 3. Added Jekyll Setup
Instead of running Jekyll locally, I used **GitHub’s built-in Jekyll processing** by:
1. Adding a `_config.yml` file to configure the site.
2. Creating a `.md` file, naming it by following the pattern **YYYY-MM-DD-title-of-your-post.md**.
3. Setting up a `_posts` folder to store my blog posts.

![Files For Setup](/blogs/assets/Files%20for%20blog.png)

### 4. Wrote My First Blog in Markdown
Jekyll uses **Markdown files** for posts, so I created a `.md` file in `_posts/` following this format:
```sh
_posts/2025-02-04-my-first-blog.md
```
Inside the file, I wrote:
```md
---
title: "My First Blog Post"
date: 2025-02-04
author: "Tanushree Shaw"
---

# My First Blog Post

This is my first blog post using Jekyll and GitHub Pages! 
```

### 5. Customized the Blog to Match My Portfolio
- Edited `_config.yml` to match my portfolio’s theme.
- Updated the **layout and styles** to ensure consistency.
- Verified the changes by checking the **GitHub Pages live link**.

## Challenges I Faced
- **Figuring Out Which method should I follow**: There are other methos that involve proper installations of some things, but for a new start Jekyll + GitHub Pages seemed the best choice.
- **Figuring Out GitHub Actions**: Jekyll on GitHub needs proper file structuring.
- **Matching My Portfolio Design**: Adjusting styles took some trial and error.

## What’s Next?
 **Complete color customization** to match my portfolio, so it blends well with my portfolio-site.
 **Write more blog posts** on tech topics and my journey.
 **Improve SEO** to help my blog rank better.

---
That’s how I set up my Jekyll blog **directly from GitHub**! If you're doing the same, just experiment and tweak things as you go. 

## Read On  
- [Internship Journey](/blogs/internship-journey/)


