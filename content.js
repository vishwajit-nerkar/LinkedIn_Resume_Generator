  const browser = chrome || browser;

  browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'scrape') {
      var data = scrapeLinkedIn();
      sendResponse({data: data});
    }
  });

  function scrapeLinkedIn() {
    var data = {};

    console.log("vishu calling this function")

    // Get the user's name
    var nameEl = document.querySelector('.text-heading-xlarge.inline.t-24.v-align-middle.break-words');
    data.name = nameEl ? nameEl.textContent.trim() : '';

    // Get the user's headline
    var headlineEl = document.querySelector('.text-body-medium.break-words');
    data.headline = headlineEl ? headlineEl.textContent.trim() : '';

    // Get the user's work experience
    data.workExperience = [];
    var workExperienceEls = document.querySelectorAll('.pv-profile-section__section-info .pv-profile-section__card-item');
    workExperienceEls.forEach(function(workExperienceEl) {
      var titleEl = workExperienceEl.querySelector('.pv-entity__summary-info h3');
      var companyEl = workExperienceEl.querySelector('.pv-entity__summary-info .pv-entity__secondary-title');
      var dateRangeEl = workExperienceEl.querySelector('.pv-entity__summary-info .pv-entity__date-range');
      var descriptionEl = workExperienceEl.querySelector('.pv-entity__extra-details');
      if (titleEl && companyEl && dateRangeEl) {
        var workExperience = {
          title: titleEl.textContent.trim(),
          company: companyEl.textContent.trim(),
          dateRange: dateRangeEl.textContent.trim(),
          description: descriptionEl ? descriptionEl.textContent.trim() : ''
        };
        data.workExperience.push(workExperience);
      }
    });

    // Get the user's education
    data.education = [];
    var educationEls = document.querySelectorAll('.education-section .pv-profile-section__card-item');
    educationEls.forEach(function(educationEl) {
      var schoolEl = educationEl.querySelector('.pv-entity__school-name');
      var degreeEl = educationEl.querySelector('.pv-entity__degree-name .pv-entity__comma-item');
      var fieldOfStudyEl = educationEl.querySelector('.pv-entity__fos .pv-entity__comma-item');
      var dateRangeEl = educationEl.querySelector('.pv-entity__dates');
      if (schoolEl && degreeEl && fieldOfStudyEl && dateRangeEl) {
        var education = {
          school: schoolEl.textContent.trim(),
          degree: degreeEl.textContent.trim(),
          fieldOfStudy: fieldOfStudyEl.textContent.trim(),
          dateRange: dateRangeEl.textContent.trim()
        };
        data.education.push(education);
      }
    });

    // Get the user's skills
    data.skills = [];
    var skillEls = document.querySelectorAll('.pv-skill-category-entity__skill-wrapper .pv-skill-category-entity__name');
    skillEls.forEach(function(skillEl) {
      var skill = skillEl.textContent.trim();
      data.skills.push(skill);
    });

    return data;
  }

  // This code extracts the user's name, headline, work experience, education, and skills from their LinkedIn profile page. You can modify it to extract additional data as needed. Note that LinkedIn may update their page structure or class names over time, so you may need to update this code periodically to ensure it continues to work correctly.

