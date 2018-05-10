$(function(){
       /* $('.tablecontainer').paginate({ 
          limit: 1, // 10 elements per page 
          initialPage: 1, // Start on second page 
          previous: true, // Show previous button 
          previousText: 'Previous page', // Change previous button text 
          next: true, // Show previous button 
          nextText: 'Next page', // Change next button text 
          first: true, // Show first button 
          firstText: 'First', // Change first button text 
          last: true, // Show last button 
          lastText: 'Last', // Change last button text 
          optional: false, // Always show the navigation menu 
          pageToText: function(i) { return (i + 1).toString(16); } // Page numbers will be shown on hexadecimal notation 
        });*/
   $('.tablecontainer').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": false,
        "autoWidth": false,
        "retrieve": true,
        "pageLength": 3
    });

    $("#datepicker").datepicker({
        minDate: "+1", maxDate: "+2Y"
    });
    $('#datepicker').attr('readOnly', 'true');
});