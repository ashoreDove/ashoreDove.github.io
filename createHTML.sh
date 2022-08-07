source newHTML.conf
if [ ! -f "$FILENAME" ]; then
	touch $FILENAME
	echo "create"
else
	echo "failed"
fi

#根据sort加入json某类数组中
py_name="addToJson.py"
python2.7 $py_name $SORT $FILENAME $PAGENAME

#写入模板
echo "<!DOCTYPE html>
<html lang=\"en\">
  <head>
    <title>海盐芝士麻薯超好吃です</title>
    <link rel=\"shortcut icon\" href=\"images/cat.png\" />
    <meta charset=\"utf-8\" />
    <meta
      name=\"viewport\"
      content=\"width=device-width, initial-scale=1, user-scalable=no\"
    />
    <link rel=\"stylesheet\" href=\"assets/css/main.css\" />
    <!-- Scripts -->
    <script src=\"assets/js/jquery.min.js\"></script>
    <script src=\"assets/js/browser.min.js\"></script>
    <script src=\"assets/js/breakpoints.min.js\"></script>
    <script src=\"assets/js/util.js\"></script>
  </head>
  <body class=\"is-preload\">
   <!-- Wrapper -->
    <div id=\"wrapper\">
      <!-- Main -->
      <div id=\"main\">
        <div class=\"inner\">
          <!-- Header -->
          <header id=\"header\"></header>
          <script>
            \$(\"#header\").load(\"/header_icon.html\");
          </script>
          <!-- Content -->" >$FILENAME

if [ $IS_PAGINATION==true ]; then

	echo "<div id=\"pagination_ul\"></div>
          <script>
            var fileName = window.location.pathname.split(\"/\").pop();
            var sort = \"$SORT\";
            \$(\"#pagination_ul\").load(\"/pagination.html\");
          </script>" >>$FILENAME
fi
echo "</div>
      </div>
      <!-- Sidebar -->
      <div id=\"sidebar\"></div>
      <script>
        \$(\"#sidebar\").load(\"/menu.html\");
      </script>
    </div>

    <!-- Scripts -->
  </body>
</html>" >>$FILENAME
