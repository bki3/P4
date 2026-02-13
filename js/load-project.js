// Get project ID from URL (e.g., project-article.html?id=1)
const urlParams = new URLSearchParams(window.location.search);
const projectId = parseInt(urlParams.get('id'));

// Load project data from JSON file
fetch('projects-data.json')
    .then(response => response.json())
    .then(data => {
        const project = data.projects.find(p => p.id === projectId);
        
        if (!project) {
            // If project not found, go back to projects page
            window.location.href = 'project.html';
            return;
        }
        
        // Fill the page with project data
        populateProject(project);
    })
    .catch(error => {
        console.error('Error loading project:', error);
        window.location.href = 'project.html';
    });

function populateProject(project) {
    // Update page title
    document.title = `${project.title} - Bi Dev Portfolio`;
    
    // Breadcrumb
    const breadcrumb = document.getElementById('breadcrumb-title');
    if (breadcrumb) breadcrumb.textContent = project.title;
    
    // Header section
    const titleElement = document.getElementById('project-title');
    if (titleElement) titleElement.textContent = project.title;
    
    const subtitleElement = document.getElementById('project-subtitle');
    if (subtitleElement) subtitleElement.textContent = project.subtitle;
    
    // Meta tags (category, tags, date, read time)
    const metaContainer = document.getElementById('project-meta');
    if (metaContainer) {
        let metaHTML = `<span class="badge bg-primary">${project.category}</span>`;
        project.tags.forEach(tag => {
            metaHTML += `<span class="badge bg-secondary">${tag}</span>`;
        });
        metaHTML += `<span class="text-muted"><i class="bi bi-calendar3"></i> ${project.date}</span>`;
        metaHTML += `<span class="text-muted"><i class="bi bi-clock"></i> ${project.readTime} read</span>`;
        metaContainer.innerHTML = metaHTML;
    }
    
    // Featured image
    const featuredImg = document.getElementById('featured-img');
    if (featuredImg) {
        featuredImg.src = project.featuredImage;
        featuredImg.alt = project.title;
    }
    
    // Overview paragraphs
    const overviewContainer = document.getElementById('project-overview');
    if (overviewContainer) {
        overviewContainer.innerHTML = '';
        project.overview.forEach(paragraph => {
            overviewContainer.innerHTML += `<p>${paragraph}</p>`;
        });
    }
    
    // Features list
    const featureList = document.getElementById('feature-list');
    if (featureList) {
        featureList.innerHTML = '';
        project.features.forEach(feature => {
            featureList.innerHTML += `<li><i class="bi bi-check-circle-fill text-success"></i> ${feature}</li>`;
        });
    }
    
    // Technologies
    const techStack = document.getElementById('tech-stack');
    if (techStack) {
        techStack.innerHTML = '';
        project.technologies.forEach(tech => {
            techStack.innerHTML += `
                <div class="col-md-4">
                    <div class="tech-card p-3 border rounded h-100">
                        <i class="bi ${tech.icon} fs-2 ${tech.color}"></i>
                        <h3 class="h5 mt-2">${tech.name}</h3>
                        <p class="text-muted small mb-0">${tech.description}</p>
                    </div>
                </div>
            `;
        });
    }
    
    // Detailed content (Read More section)
    const planningElement = document.getElementById('content-planning');
    if (planningElement) planningElement.textContent = project.detailedContent.planning;
    
    const implementationElement = document.getElementById('content-implementation');
    if (implementationElement) implementationElement.textContent = project.detailedContent.implementation;
    
    const challengesElement = document.getElementById('content-challenges');
    if (challengesElement) challengesElement.textContent = project.detailedContent.challenges;
    
    const resultsElement = document.getElementById('content-results');
    if (resultsElement) resultsElement.textContent = project.detailedContent.results;
    
    // Project links
    const linksContainer = document.getElementById('project-links');
    if (linksContainer) {
        linksContainer.innerHTML = '';
        
        if (project.links.live) {
            linksContainer.innerHTML += `
                <a href="${project.links.live}" class="btn btn-primary" target="_blank">
                    <i class="bi bi-globe"></i> Live Demo
                </a>
            `;
        }
        
        if (project.links.github) {
            linksContainer.innerHTML += `
                <a href="${project.links.github}" class="btn btn-dark" target="_blank">
                    <i class="bi bi-github"></i> View on GitHub
                </a>
            `;
        }
        
        if (project.links.download) {
            linksContainer.innerHTML += `
                <a href="${project.links.download}" class="btn btn-outline-primary">
                    <i class="bi bi-download"></i> Download
                </a>
            `;
        }
    }
}

// Toggle Read More button
function toggleReadMore(button) {
    const icon = button.querySelector('i');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
        button.innerHTML = '<i class="bi bi-chevron-down"></i> Read More';
    } else {
        button.innerHTML = '<i class="bi bi-chevron-up"></i> Read Less';
    }
}
