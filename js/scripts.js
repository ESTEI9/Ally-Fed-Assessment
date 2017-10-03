jQuery(document).ready(function($){
    
    
    // ---------- Load Sidebar Tab Content ---------- //
       //I would assume this content is normally fetched via AJAX, so that's why I'm loading it here.

        let tabArray = {
        'news':[
                {'title': 'Lorem Ipsum Dolor', 'link': '#', 'excerpt': 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis'},
                {'title': 'Lorem Ipsum Dolor', 'link': '#', 'excerpt': 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis'},
                {'title': 'Lorem Ipsum Dolor', 'link': '#', 'excerpt': 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis'}
        ],
        'archive':[
                {'title': 'Lorem Ipsum Dolor', 'link':'#'},
                {'title': 'Lorem Ipsum Dolor', 'link':'#'},
                {'title': 'Lorem Ipsum Dolor', 'link':'#'},
                {'title': 'Lorem Ipsum Dolor', 'link':'#'},
                {'title': 'Lorem Ipsum Dolor', 'link':'#'},
                {'title': 'Lorem Ipsum Dolor', 'link':'#'},
                {'title': 'Lorem Ipsum Dolor', 'link':'#'},
                {'title': 'Lorem Ipsum Dolor', 'link':'#'}
        ]
    };

        function switchTabs(tab) {
            $('#tab-content div').html('<div class="loading">Loading. Please be patient.</div>');
            $(tab).addClass('active');
            $(tab).siblings().removeClass('active');
            let tabName = $(tab).text().toLowerCase();
            let tabContent = tabArray[tabName];
            let contents = '';

            for (let i=0; i<tabContent.length; i++) {
                let title = tabContent[i]['title'];
                let link = tabContent[i]['link'];
                let excerpt = tabContent[i]['excerpt'];
                contents += '<div class="snippet"><a class="tab-link" href="'+link+'">'+title+'</a>';

                if(excerpt) {
                    contents += '<p class="excerpt">'+excerpt+'</p>';
                }

                contents += '</div>';
             };
            $('#tab-content div').html(contents).animate({'opacity':1}, 300);
        }

        switchTabs($('.tab.active'));

        $('.tab').click(function(){ 
            let tab = this;

            $('#tab-content div').animate({'opacity':0},300).promise().done(function(){
                switchTabs(tab);
            });
        });
    
    // ---------- Load Rates Table ---------- //
    
    $.getJSON("js/code-test.json", function(results){
        let tableData = results;
        let rowData = '<tr><th colspan="2">Annual Percentage Yield</th><th>Est. Earnings for 1 Year*</th>';
        tableData.sort(function(a,b){
            if (a.apy > b.apy) {
                return -1;
            };
            if (a.apy < b.apy) {
                return 1;
            };
            return 0;
        });
        for (let i=0; i<tableData.length; i++) {
            let row = tableData[i];
            rowData += '<tr><td>'+row.name+'</td><td>'+row.apy+'%</td><td>$'+row.earnings+'</td></tr>';
        }
        rowData += '<tr><td colspan="3">*Based on a $50,000 deposit.</td></tr>';
        $('#rates-table').html(rowData);
    })
    .fail(function(){
      console.log("Error fetching or parsing JSON.");
        $('#rates-table').html('<tr><td>Data unavailable at this time.</td></tr>');
      });
    
    // ---------- Account Sign In ---------- //
    
    $('#login button').click(function(){
       $('body').append('<div id="lightbox"></div>\
                        <div id="signInModal" class="modal">\
                            <img class="close" src="assets/img/times.png">\
                            <form method="post" id="loginForm" autocomplete="off">\
                                <h4>Sign In To Your Account</h4>\
                                <div id="loginFields">\
                                    <field><label>Username</label><input name="username" type="text"></field>\
                                    <field><label>Password</label><input name="password" type="password"></field>\
                                </div>\
                                <button type="submit" class="button-style-1">Login</button>\
                            </form>\
                        </div>');
        $('#lightbox').fadeIn(300);
        
    });
    
    $(document).on('click','#lightbox, .close',function(){
        $('.modal').remove();
        $('#lightbox').fadeOut(300).promise().done(function(){
        $('#lightbox').remove();});
    });
    
    // ---------- Responsive Functions ---------- //
    
    if(window.innerWidth < 768) {
        $('#header-menu').addClass('responsive-menu');
    }
    else {
        $('#header-menu').removeClass('responsive-menu');
    }
    
    $(window).resize(function(){
        if (window.innerWidth < 768) {
            $('#header-menu').addClass('responsive-menu');
        }
        else {
            $('#header-menu').removeClass('responsive-menu');
        }
    });
    
    $('#menu-toggle').click(function(){
        $(this).toggleClass('menu-open');
        $('.responsive-menu ul').toggleClass('drawer-open');
    });
    
});