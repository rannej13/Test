

// Define the CSV file path
// const csvFilePath = 'https://github.com/rannej13/Test/blob/main/SchoolResultsAberdeen.csv';

// Fetch the CSV file using the Fetch API
    // Papa.parse("https://github.com/rannej13/Test/blob/main/SchoolResultsAberdeen.csv", {
    //   download: true,
    //   header: true,
    //   dynamicTyping: true,
    //   complete: function(results) {
    //     var data = processData(results.data);

    //     var ctx = document.getElementById('myChart').getContext('2d');
    //     var chart = new Chart(ctx, {
    //       type: 'line',
    //       data: {
    //         labels: data.labels,
    //         datasets: data.datasets
    //       }
    //     });
    //   }
    // });

    // function processData(data) {
    //   var labels = Object.keys(data[0]).slice(1);
    //   var datasets = [];

    //   data.forEach(function(row) {
    //     var label = row[Object.keys(row)[0]];
    //     var values = Object.values(row).slice(1);
    //     var dataset = {
    //       label: label,
    //       data: values,
    //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //       borderColor: 'rgba(255, 99, 132, 1)',
    //       borderWidth: 1
    //     };
    //     datasets.push(dataset);
    //   });

    //   return { labels: labels, datasets: datasets };
    // }


        // Papa.parse("proxy.php?url=https://github.com/rannej13/Test/blob/main/SchoolResultsAberdeen.csv", {
        //   download: true,
        //   header: true,
        //   dynamicTyping: true,
        //   complete: function(results) {
        //     var data = processData(results.data);
    
        //     var ctx = document.getElementById('myChart').getContext('2d');
        //     var chart = new Chart(ctx, {
        //       type: 'line',
        //       data: {
        //         labels: data.labels,
        //         datasets: data.datasets
        //       }
        //     });
        //   }
        // });
    
        // function processData(data) {
        //   var labels = Object.keys(data[0]).slice(1);
        //   var datasets = [];
    
        //   data.forEach(function(row) {
        //     var label = row[Object.keys(row)[0]];
        //     var values = Object.values(row).slice(1);
        //     var dataset = {
        //       label: label,
        //       data: values,
        //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
        //       borderColor: 'rgba(255, 99, 132, 1)',
        //       borderWidth: 1
        //     };
        //     datasets.push(dataset);
        //   });
    
        //   return { labels: labels, datasets: datasets };
        // }
   
    
  
        // function createCORSRequest(method, url) {
        //   var xhr = new XMLHttpRequest();
        //   if ("withCredentials" in xhr) {
        //     xhr.open(method, url, true);
        //   } else if (typeof XDomainRequest != "undefined") {
        //     xhr = new XDomainRequest();
        //     xhr.open(method, url);
        //   } else {
        //     xhr = null;
        //   }
        //   return xhr;
        // }
    
        // function makeCorsRequest(url) {
        //   var xhr = createCORSRequest('GET', url);
        //   if (!xhr) {
        //     alert('CORS not supported');
        //     return;
        //   }
    
        //   xhr.onload = function() {
        //     var responseText = xhr.responseText;
        //     Papa.parse(responseText, {
        //       download: true,
        //       header: true,
        //       dynamicTyping: true,
        //       complete: function(results) {
        //         var data = processData(results.data);
    
        //         var ctx = document.getElementById('myChart').getContext('2d');
        //         var chart = new Chart(ctx, {
        //           type: 'line',
        //           data: {
        //             labels: data.labels,
        //             datasets: data.datasets
        //           }
        //         });
        //       }
        //     });
        //   };
    
        //   xhr.onerror = function() {
        //     alert('Error');
        //   };
    
        //   xhr.send();
        // }
       
  

            function makeCorsRequest(url, callback) {
              Papa.parse(url, {
                download: true,
                header: true,
                complete: function(results) {
                  callback(results.data);
                }
              });
            }
        
            var ctx = document.getElementById('myChart').getContext('2d');
            makeCorsRequest("proxy.php?url=https://github.com/rannej13/Test/raw/main/SchoolResultsAberdeen.csv", function(data) {
              var labels = [], values = [], bgColor = [], borderColor = [];
              var keys = Object.keys(data[0]); // get the keys of the first row
              keys.forEach(function(key) {
                if (key !== '') {
                  labels.push(key);
                }
              });
              data.forEach(function(row) {
                keys.forEach(function(key) {
                  if (key !== '') {
                    values.push(row[key]);
                    bgColor.push('rgba(255, 99, 132, 0.2)');
                    borderColor.push('rgba(255, 99, 132, 1)');
                  }
                });
              });
              var chartData = {
                labels: labels,
                datasets: [{
                  label: 'Data',
                  data: values,
                  backgroundColor: bgColor,
                  borderColor: borderColor,
                  borderWidth: 1
                }]
              };
              var chartConfig = {
                type: 'bar',
                data: chartData,
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              };
              var myChart = new Chart(ctx, chartConfig);
            });
  
          
      
