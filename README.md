# SNM - Simple Node Manager

A simple web application, built over Rudder Rest API to manage Nodes.

It was created as a demo for My talk @ config management camp

It's clearly needs some polishing, and does not work as is, but can be extended or improved in the future

## How to make it work 


Can deploy it using apache with a classic Directory directive

<pre>
<VirtualHost *:80>

  Alias /demo /home/vincent/workspace/appli-demo
  <Directory "/home/vincent/workspace/appli-demo">
     AllowOverride All
     # New directive needed in Apache 2.4.3: 
     Require all granted
  </Directory>

</VirtualHost>
</pre>

I also have to modify my Rudder apache conf for now (ie, /etc/httpd/conf.d/rudder.conf), in the SSL Virtualhost, 443:

<pre>
  Header set Access-Control-Allow-Origin "*"
  Header always set Access-Control-Allow-Methods "POST, GET, OPTIONS, PUT, DELETE"
  # Logs

  RewriteEngine On
  RewriteCond %{REQUEST_METHOD} OPTIONS
  RewriteRule ^(.*)$ $1 [R=200,L]

</pre>
