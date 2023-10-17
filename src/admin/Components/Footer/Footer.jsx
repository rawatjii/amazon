import React, { useEffect } from 'react';


const Footer = ()=>{

    useEffect(() => {
      // === sidebar menu activation js
        $(function () {
            for (var i = window.location, o = $(".metismenu li a").filter(function () {
                return this.href == i;
            }).addClass("").parent().addClass("mm-active");;) {
                if (!o.is("li")) break;
                o = o.parent("").addClass("mm-show").parent("").addClass("mm-active");
            }
        });
        // metismenu
        $(function () {
            $('#menu').metisMenu();
        });
    
    }, [])
    

    return(
        <footer class="page-footer">
			<p class="mb-0">Copyright © 2021. All right reserved.</p>
		</footer>
    );
}

export default Footer;