

// Define the CSV file path
// const csvFilePath = 'https://github.com/rannej13/Test/blob/main/SchoolResultsAberdeen.csv';

// Fetch the CSV file using the Fetch API
    Papa.parse("https://github.com/rannej13/Test/blob/master/SchoolProject2/SchoolResultsAberdeen.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        var data = processData(results.data);

        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.labels,
            datasets: data.datasets
          }
        });
      }
    });

    function processData(data) {
      var labels = Object.keys(data[0]).slice(1);
      var datasets = [];

      data.forEach(function(row) {
        var label = row[Object.keys(row)[0]];
        var values = Object.values(row).slice(1);
        var dataset = {
          label: label,
          data: values,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        };
        datasets.push(dataset);
      });

      return { labels: labels, datasets: datasets };
    }




   
   
  

  
          
      
