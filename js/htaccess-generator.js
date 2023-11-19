function generate_htaccess()
{var htaccess='RewriteEngine on\n';if($('#auth').attr('checked')&&$('#auth_title').val()!==''&&$('#auth_htpasswd').val()!=='')
htaccess+='\nAuthType Basic\nAuthName "'+$('#auth_title').val()+'"\nAuthUserFile '+$('#auth_htpasswd').val()+'\nRequire valid-user\n';if($('#blocked_stuff').attr('checked')&&($('#blocked_ips').val().trim()!==''||$('#blocked_domains').val().trim()!==''))
{if($('#blocked_ips').val().trim()!=='')
{htaccess+='\nOrder Deny,Allow\n';var banned_ips=$('#blocked_ips').val().trim().split("\n");for(var i in banned_ips)
htaccess+='Deny from '+banned_ips[i]+'\n';}
htaccess+='\n';if($('#blocked_domains').val().trim()!=='')
{var banned_domains=$('#blocked_domains').val().trim().split("\n");for(var i in banned_domains)
htaccess+='RewriteCond %{HTTP_REFERER} ^http(s)?://(www\.)?'+banned_domains[i]+'.*$ [NC'+(i-1!=banned_domains.length?',OR':'')+']\n';htaccess+='RewriteRule .* '+($('#blocked_domains_redirect').val().trim()!==''?$('#blocked_domains_redirect').val().trim():'-')+' [R,L]\n';}}
if($('#www_redirect').attr('checked')&&$('#www_redirect_domain').val()!=='')
if($('#www_redirect_type').val()==='tomain')
htaccess+='\nRewriteCond %{HTTP_HOST} ^www\.'+$('#www_redirect_domain').val().replace('.','\.')+' [NC]\nRewriteRule (.*) http://'+$('#www_redirect_domain').val()+'/$1 [L,R=301]\n';else
htaccess+='\nRewriteCond %{HTTP_HOST} ^'+$('#www_redirect_domain').val().replace('.','\.')+' [NC]\nRewriteRule (.*) http://www.'+$('#www_redirect_domain').val()+'/$1 [L,R=301]\n';if($('#add_trailing_slash').attr('checked'))
htaccess+='\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule ^(.*[^/])$ /$1/ [R=301,L]\n';if($('#error_pages_404').val().trim()!=='')
htaccess+='\nErrorDocument 404 '+$('#error_pages_404').val().trim()+'\n';if($('#error_pages_403').val().trim()!=='')
htaccess+='\nErrorDocument 403 '+$('#error_pages_403').val().trim()+'\n';if($('#error_pages_500').val().trim()!=='')
htaccess+='\nErrorDocument 500 '+$('#error_pages_500').val().trim()+'\n';if($('#error_pages_401').val().trim()!=='')
htaccess+='\nErrorDocument 401 '+$('#error_pages_401').val().trim()+'\n';if($('#hotlink_image').attr('checked'))
{htaccess+='\n';if($('#hotlink_allow_blank').attr('checked'))
htaccess+='RewriteCond %{HTTP_REFERER} !^$\n';var allowed_domains=$('#hotlink_allowed_domains').val().trim().split("\n");for(var i in allowed_domains)
htaccess+='RewriteCond %{HTTP_REFERER} !^http(s)?://(www\.)?'+allowed_domains[i]+' [NC]\n';var exts=$('#hotlink_exts').val().trim().split(" ").join('|');htaccess+='RewriteRule \\.('+exts+')$ '+($('#hotlink_stub').attr('checked')?$('#hotlink_stub_url').val():'-')+' [NC,F,L]\n';}
$('.lang_redirect_lang').each(function(index){if($('.lang_redirect_url:eq('+index+')').val().trim()!=='')
htaccess+='\nRewriteCond %{HTTP:Accept-Language} ('+$(this).val()+') [NC]\nRewriteRule ^$ '+$('.lang_redirect_url:eq('+index+')').val().trim()+' [L]\n';});$('.mobile_redirect_device').each(function(index){if($('.mobile_redirect_url:eq('+index+')').val().trim()!=='')
htaccess+='\nRewriteCond %{HTTP_USER_AGENT} ^.*'+$(this).val()+'.*$\nRewriteRule ^$ '+$('.mobile_redirect_url:eq('+index+')').val().trim()+' [R=301]\n';});$('#result').val(htaccess);}
function rebind_lang_redirect_fields()
{$('.lang_redirect_url').unbind('keyup');$('.lang_redirect_lang').unbind('change');$('.lang_redirect_url').keyup(function(){generate_htaccess()});$('.lang_redirect_lang').change(function(){generate_htaccess()});}
function rebind_mobile_redirect_fields()
{$('.mobile_redirect_url').unbind('keyup');$('.mobile_redirect_device').unbind('change');$('.mobile_redirect_url').keyup(function(){generate_htaccess()});$('.mobile_redirect_device').change(function(){generate_htaccess()});}
$().ready(function()
{$("input[type='checkbox']").click(function(){generate_htaccess()});$("input[type='text'], textarea").keyup(function(){generate_htaccess()});$("select").change(function(){generate_htaccess()});$('#auth').click(function(){$('#auth_title, #auth_htpasswd').prop('disabled',!$(this).attr('checked'))});$('#hotlink_image').click(function(){$('#hotlink_allowed_domains, #hotlink_allow_blank, #hotlink_stub, #hotlink_stub_url, #hotlink_exts').prop('disabled',!$(this).attr('checked'))});$('#blocked_stuff').click(function(){$('#blocked_domains, #blocked_domains_redirect, #blocked_ips').prop('disabled',!$(this).attr('checked'));});rebind_lang_redirect_fields();rebind_mobile_redirect_fields();$('#add_lang_redirect').click(function(){$('#lang_redirect_block').append("<p class='gap'><select class='lang_redirect_lang form-control'></select></p><p><input type='text' class='lang_redirect_url form-control'/></p>");$('.lang_redirect_lang').filter(":last").html($('.lang_redirect_lang').filter(":first").html());rebind_lang_redirect_fields();$('#remove_lang_redirect').show();generate_htaccess();});$('#remove_lang_redirect').click(function(){$('.lang_redirect_lang').filter(":last").remove();$('.lang_redirect_url').filter(":last").remove();rebind_lang_redirect_fields();if($('.lang_redirect_lang').length==1)
$('#remove_lang_redirect').hide();generate_htaccess();});$('#add_mobile_redirect').click(function(){$('#mobile_redirect_block').append("<p class='gap'><select class='mobile_redirect_device form-control'></select></p><p><input type='text' class='mobile_redirect_url form-control'/></p>");$('.mobile_redirect_device').filter(":last").html($('.mobile_redirect_device').filter(":first").html());rebind_mobile_redirect_fields();$('#remove_mobile_redirect').show();generate_htaccess();});$('#remove_mobile_redirect').click(function(){$('.mobile_redirect_device').filter(":last").remove();$('.mobile_redirect_url').filter(":last").remove();rebind_mobile_redirect_fields();if($('.mobile_redirect_device').length==1)
$('#remove_mobile_redirect').hide();generate_htaccess();});$("textarea[id='result']").click(function(){this.select();});});