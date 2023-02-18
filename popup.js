document.getElementById('generate-btn').addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'scrape'}, function(response) {
      generateResume(response.data);
    });
  });
});

function generateResume(data) {
  // Define the document definition object
  var docDefinition = {
    content: [
      { text: data.name, style: 'header' },
      { text: data.headline, style: 'subheader' },
      { text: 'Work Experience', style: 'sectionHeader' },
      { ul: data.workExperience.map(function(workExperience) {
          return workExperience.title + ', ' + workExperience.company + ' (' + workExperience.dateRange + ')' +
            (workExperience.description ? ('\n' + workExperience.description) : '');
        })
      },
      { text: 'Education', style: 'sectionHeader' },
      { ul: data.education.map(function(education) {
          return education.degree + ' in ' + education.fieldOfStudy + ', ' + education.school + ' (' + education.dateRange + ')';
        })
      },
      { text: 'Skills', style: 'sectionHeader' },
      { ul: data.skills }
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 5]
      },
      sectionHeader: {
        fontSize: 16,
        bold: true,
        margin: [0, 20, 0, 5]
      }
    }
  };

  // Generate the PDF document using pdfmake
  pdfMake.createPdf(docDefinition).download('resume.pdf');
}

