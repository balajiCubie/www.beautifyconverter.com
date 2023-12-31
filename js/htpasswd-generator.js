var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
function hex_sha1(s)    { return rstr2hex(rstr_sha1(str2rstr_utf8(s))); }
function b64_sha1(s)    { return rstr2b64(rstr_sha1(str2rstr_utf8(s))); }
function any_sha1(s, e) { return rstr2any(rstr_sha1(str2rstr_utf8(s)), e); }
function hex_hmac_sha1(k, d)
  { return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_sha1(k, d)
  { return rstr2b64(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_sha1(k, d, e)
  { return rstr2any(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test()
{
  return hex_sha1("abc").toLowerCase() == "a9993e364706816aba3e25717850c26c9cd0d89d";
}
function rstr_sha1(s)
{
  return binb2rstr(binb_sha1(rstr2binb(s), s.length * 8));
}

/*
 * Calculate the HMAC-SHA1 of a key and some data (raw strings)
 */
function rstr_hmac_sha1(key, data)
{
  var bkey = rstr2binb(key);
  if(bkey.length > 16) bkey = binb_sha1(bkey, key.length * 8);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binb_sha1(ipad.concat(rstr2binb(data)), 512 + data.length * 8);
  return binb2rstr(binb_sha1(opad.concat(hash), 512 + 160));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input)
{
  try { hexcase } catch(e) { hexcase=0; }
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
           +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input)
{
  try { b64pad } catch(e) { b64pad=''; }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for(var i = 0; i < len; i += 3)
  {
    var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > input.length * 8) output += b64pad;
      else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
    }
  }
  return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding)
{
  var divisor = encoding.length;
  var remainders = Array();
  var i, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for(i = 0; i < dividend.length; i++)
  {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. We stop when the dividend is zero.
   * All remainders are stored for later use.
   */
  while(dividend.length > 0)
  {
    quotient = Array();
    x = 0;
    for(i = 0; i < dividend.length; i++)
    {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if(quotient.length > 0 || q > 0)
        quotient[quotient.length] = q;
    }
    remainders[remainders.length] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for(i = remainders.length - 1; i >= 0; i--)
    output += encoding.charAt(remainders[i]);

  /* Append leading zero equivalents */
  var full_length = Math.ceil(input.length * 8 /
                                    (Math.log(encoding.length) / Math.log(2)))
  for(i = output.length; i < full_length; i++)
    output = encoding[0] + output;

  return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
  }
  return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                  (input.charCodeAt(i) >>> 8) & 0xFF);
  return output;
}

function str2rstr_utf16be(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                   input.charCodeAt(i)        & 0xFF);
  return output;
}

/*
 * Convert a raw string to an array of big-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binb(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
  return output;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
  return output;
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function binb_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = bit_rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = bit_rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = "=";/* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/* 
 * Perform a simple self-test to see if the VM is working 
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;
  
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
 
    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
  
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++) 
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}
function dP(pw, salt){
  pw_salt=this.crypt(salt, pw);
  return pw_salt[0];       // L'élément 1 est le salt utilisé (que la fonction cript() limite à 2 caractères).
}

function bTU(b){
  value=Math.floor(b);
  return (value>=0?value:value+256);
}
function fBTI(b,offset){
  value=this.byteToUnsigned(b[offset++]);
  value|=(this.byteToUnsigned(b[offset++])<<8);
  value|=(this.byteToUnsigned(b[offset++])<<16);
  value|=(this.byteToUnsigned(b[offset++])<<24);
  return value;
}
function iTFB(iValue,b,offset){
  b[offset++]=((iValue)&0xff);
  b[offset++]=((iValue>>>8)&0xff);
  b[offset++]=((iValue>>>16)&0xff);
  b[offset++]=((iValue>>>24)&0xff);
}
function P_P(a,b,n,m,results){
  t=((a>>>n)^b)&m;
  a^=t<<n;
  b^=t;
  results[0]=a;
  results[1]=b;
}
function H_P(a,n,m){
  t=((a<<(16-n))^a)&m;
  a=a^t^(t>>>(16-n));
  return a;
}
function d_s_k(key){
  schedule=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  c=this.fourBytesToInt(key,0);
  d=this.fourBytesToInt(key,4);
  results=new Array(0,0);
  this.PERM_OP(d,c,4,0x0f0f0f0f,results);
  d=results[0];c=results[1];
  c=this.HPERM_OP(c,-2,0xcccc0000);
  d=this.HPERM_OP(d,-2,0xcccc0000);
  this.PERM_OP(d,c,1,0x55555555,results);
  d=results[0];c=results[1];
  this.PERM_OP(c,d,8,0x00ff00ff,results);
  c=results[0];d=results[1];
  this.PERM_OP(d,c,1,0x55555555,results);
  d=results[0];c=results[1];
  d=(((d&0x000000ff)<<16)|(d&0x0000ff00)|((d&0x00ff0000)>>>16)|((c&0xf0000000)>>>4));
  c&=0x0fffffff;
  s=0;t=0;
  j=0;
  for(i=0;i<this.ITERATIONS;i++){
    if(this.shifts2[i]){
      c=(c>>>2)|(c<<26);
      d=(d>>>2)|(d<<26);
    }else{
      c=(c>>>1)|(c<<27);
      d=(d>>>1)|(d<<27);
    }
    c&=0x0fffffff;
    d&=0x0fffffff;
    s=this.skb[0][c&0x3f]|this.skb[1][((c>>>6)&0x03)|((c>>>7)&0x3c)]|this.skb[2][((c>>>13)&0x0f)|((c>>>14)&0x30)]|this.skb[3][((c>>>20)&0x01)|((c>>>21)&0x06)|((c>>>22)&0x38)];
    t=this.skb[4][d&0x3f]|this.skb[5][((d>>>7)&0x03)|((d>>>8)&0x3c)]|this.skb[6][(d>>>15)&0x3f]|this.skb[7][((d>>>21)&0x0f)|((d>>>22)&0x30)];
    schedule[j++]=((t<< 16)|(s&0x0000ffff))&0xffffffff;
    s=((s>>>16)|(t&0xffff0000));
    s=(s<<4)|(s>>>28);
    schedule[j++]=s&0xffffffff;
  }
  return schedule;
}
function D_E(L,R,S,E0,E1,s){
  v=R^(R>>>16);
  u=v&E0;
  v=v&E1;
  u=(u^(u<<16))^R^s[S];
  t=(v^(v<<16))^R^s[S+1];
  t=(t>>>4)|(t<<28);
  L^=this.SPtrans[1][t&0x3f]|this.SPtrans[3][(t>>>8)&0x3f]|this.SPtrans[5][(t>>>16)&0x3f]|this.SPtrans[7][(t>>>24)&0x3f]|this.SPtrans[0][u&0x3f]|this.SPtrans[2][(u>>>8)&0x3f]|this.SPtrans[4][(u>>>16)&0x3f]|this.SPtrans[6][(u>>>24)&0x3f];
  return L;
}
function bdy(schedule,Eswap0,Eswap1) {
  left=0;
  right=0;
  t=0;
  for(j=0;j<25;j++){
    for(i=0;i<this.ITERATIONS*2;i+=4){
      left=this.D_ENCRYPT(left, right,i,Eswap0,Eswap1,schedule);
      right=this.D_ENCRYPT(right,left,i+2,Eswap0,Eswap1,schedule);
    }
    t=left; 
    left=right; 
    right=t;
  }
  t=right;
  right=(left>>>1)|(left<<31);
  left=(t>>>1)|(t<<31);
  left&=0xffffffff;
  right&=0xffffffff;
  results=new Array(0,0);
  this.PERM_OP(right,left,1,0x55555555,results); 
  right=results[0];left=results[1];
  this.PERM_OP(left,right,8,0x00ff00ff,results); 
  left=results[0];right=results[1];
  this.PERM_OP(right,left,2,0x33333333,results); 
  right=results[0];left=results[1];
  this.PERM_OP(left,right,16,0x0000ffff,results);
  left=results[0];right=results[1];
  this.PERM_OP(right,left,4,0x0f0f0f0f,results);
  right=results[0];left=results[1];
  out=new Array(0,0);
  out[0]=left;out[1]=right;
  return out;
}
function rC(){ return this.GOODCHARS[Math.floor(64*Math.random())]; }
function cript(salt,original){
  if(salt.length>=2) salt=salt.substring(0,2);
  while(salt.length<2) salt+=this.randChar();
  re=new RegExp("[^./a-zA-Z0-9]","g");
  if(re.test(salt)) salt=this.randChar()+this.randChar();
  charZero=salt.charAt(0)+'';
  charOne=salt.charAt(1)+'';
  ccZ=charZero.charCodeAt(0);
  ccO=charOne.charCodeAt(0);
  buffer=charZero+charOne+"       ";
  Eswap0=this.con_salt[ccZ];
  Eswap1=this.con_salt[ccO]<<4;
  key=new Array(0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0);
  for(i=0;i<key.length&&i<original.length;i++){
     iChar=original.charCodeAt(i);
     key[i]=iChar<<1;
  }
  schedule=this.des_set_key(key);
  out=this.body(schedule,Eswap0,Eswap1);
  b=new Array(0,0,0,0,0,0,0,0,0);
  this.intToFourBytes(out[0],b,0);
  this.intToFourBytes(out[1],b,4);
  b[8]=0;
  for(i=2,y=0,u=0x80;i<13;i++){
    for(j=0,c=0;j<6;j++){
      c<<=1;
      if((b[y]&u)!=0) c|=1;
      u>>>=1;
      if(u==0){
        y++;
        u=0x80;
      }
      buffer=buffer.substring(0,i)+String.fromCharCode(this.cov_2char[c])+buffer.substring(i+1,buffer.length);
    }
  }
  ret=new Array(buffer,salt);
  return ret;
}

function Crypt() {
this.ITERATIONS=16;
this.GOODCHARS=new Array(
  ".","/","0","1","2","3","4","5","6","7",
  "8","9","A","B","C","D","E","F","G","H",
  "I","J","K","L","M","N","O","P","Q","R",
  "S","T","U","V","W","X","Y","Z","a","b",
  "c","d","e","f","g","h","i","j","k","l",
  "m","n","o","p","q","r","s","t","u","v",
  "w","x","y","z");
this.con_salt=new Array(
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00, 
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00, 
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00, 
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00, 
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00, 
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01, 
  0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09, 
  0x0A,0x0B,0x05,0x06,0x07,0x08,0x09,0x0A, 
  0x0B,0x0C,0x0D,0x0E,0x0F,0x10,0x11,0x12, 
  0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x1A, 
  0x1B,0x1C,0x1D,0x1E,0x1F,0x20,0x21,0x22, 
  0x23,0x24,0x25,0x20,0x21,0x22,0x23,0x24, 
  0x25,0x26,0x27,0x28,0x29,0x2A,0x2B,0x2C, 
  0x2D,0x2E,0x2F,0x30,0x31,0x32,0x33,0x34, 
  0x35,0x36,0x37,0x38,0x39,0x3A,0x3B,0x3C, 
  0x3D,0x3E,0x3F,0x00,0x00,0x00,0x00,0x00 );
this.shifts2=new Array(
  false,false,true,true,true,true,true,true,
  false,true, true,true,true,true,true,false );
this.skb=new Array(0,0,0,0,0,0,0,0);
  this.skb[0]=new Array(
     0x00000000,0x00000010,0x20000000,0x20000010, 
     0x00010000,0x00010010,0x20010000,0x20010010, 
     0x00000800,0x00000810,0x20000800,0x20000810, 
     0x00010800,0x00010810,0x20010800,0x20010810, 
     0x00000020,0x00000030,0x20000020,0x20000030, 
     0x00010020,0x00010030,0x20010020,0x20010030, 
     0x00000820,0x00000830,0x20000820,0x20000830, 
     0x00010820,0x00010830,0x20010820,0x20010830, 
     0x00080000,0x00080010,0x20080000,0x20080010, 
     0x00090000,0x00090010,0x20090000,0x20090010, 
     0x00080800,0x00080810,0x20080800,0x20080810, 
     0x00090800,0x00090810,0x20090800,0x20090810, 
     0x00080020,0x00080030,0x20080020,0x20080030, 
     0x00090020,0x00090030,0x20090020,0x20090030, 
     0x00080820,0x00080830,0x20080820,0x20080830, 
     0x00090820,0x00090830,0x20090820,0x20090830 );
  this.skb[1]=new Array(
     0x00000000,0x02000000,0x00002000,0x02002000, 
     0x00200000,0x02200000,0x00202000,0x02202000, 
     0x00000004,0x02000004,0x00002004,0x02002004, 
     0x00200004,0x02200004,0x00202004,0x02202004, 
     0x00000400,0x02000400,0x00002400,0x02002400, 
     0x00200400,0x02200400,0x00202400,0x02202400, 
     0x00000404,0x02000404,0x00002404,0x02002404, 
     0x00200404,0x02200404,0x00202404,0x02202404, 
     0x10000000,0x12000000,0x10002000,0x12002000, 
     0x10200000,0x12200000,0x10202000,0x12202000, 
     0x10000004,0x12000004,0x10002004,0x12002004, 
     0x10200004,0x12200004,0x10202004,0x12202004, 
     0x10000400,0x12000400,0x10002400,0x12002400, 
     0x10200400,0x12200400,0x10202400,0x12202400, 
     0x10000404,0x12000404,0x10002404,0x12002404, 
     0x10200404,0x12200404,0x10202404,0x12202404 );
  this.skb[2]=new Array(
     0x00000000,0x00000001,0x00040000,0x00040001, 
     0x01000000,0x01000001,0x01040000,0x01040001, 
     0x00000002,0x00000003,0x00040002,0x00040003, 
     0x01000002,0x01000003,0x01040002,0x01040003, 
     0x00000200,0x00000201,0x00040200,0x00040201, 
     0x01000200,0x01000201,0x01040200,0x01040201, 
     0x00000202,0x00000203,0x00040202,0x00040203, 
     0x01000202,0x01000203,0x01040202,0x01040203, 
     0x08000000,0x08000001,0x08040000,0x08040001, 
     0x09000000,0x09000001,0x09040000,0x09040001, 
     0x08000002,0x08000003,0x08040002,0x08040003, 
     0x09000002,0x09000003,0x09040002,0x09040003, 
     0x08000200,0x08000201,0x08040200,0x08040201, 
     0x09000200,0x09000201,0x09040200,0x09040201, 
     0x08000202,0x08000203,0x08040202,0x08040203, 
     0x09000202,0x09000203,0x09040202,0x09040203 );
  this.skb[3]=new Array(
     0x00000000,0x00100000,0x00000100,0x00100100, 
     0x00000008,0x00100008,0x00000108,0x00100108, 
     0x00001000,0x00101000,0x00001100,0x00101100, 
     0x00001008,0x00101008,0x00001108,0x00101108, 
     0x04000000,0x04100000,0x04000100,0x04100100, 
     0x04000008,0x04100008,0x04000108,0x04100108, 
     0x04001000,0x04101000,0x04001100,0x04101100, 
     0x04001008,0x04101008,0x04001108,0x04101108, 
     0x00020000,0x00120000,0x00020100,0x00120100, 
     0x00020008,0x00120008,0x00020108,0x00120108, 
     0x00021000,0x00121000,0x00021100,0x00121100, 
     0x00021008,0x00121008,0x00021108,0x00121108, 
     0x04020000,0x04120000,0x04020100,0x04120100, 
     0x04020008,0x04120008,0x04020108,0x04120108, 
     0x04021000,0x04121000,0x04021100,0x04121100, 
     0x04021008,0x04121008,0x04021108,0x04121108 );
  this.skb[4]=new Array(
     0x00000000,0x10000000,0x00010000,0x10010000, 
     0x00000004,0x10000004,0x00010004,0x10010004, 
     0x20000000,0x30000000,0x20010000,0x30010000, 
     0x20000004,0x30000004,0x20010004,0x30010004, 
     0x00100000,0x10100000,0x00110000,0x10110000, 
     0x00100004,0x10100004,0x00110004,0x10110004, 
     0x20100000,0x30100000,0x20110000,0x30110000, 
     0x20100004,0x30100004,0x20110004,0x30110004, 
     0x00001000,0x10001000,0x00011000,0x10011000, 
     0x00001004,0x10001004,0x00011004,0x10011004, 
     0x20001000,0x30001000,0x20011000,0x30011000, 
     0x20001004,0x30001004,0x20011004,0x30011004, 
     0x00101000,0x10101000,0x00111000,0x10111000, 
     0x00101004,0x10101004,0x00111004,0x10111004, 
     0x20101000,0x30101000,0x20111000,0x30111000, 
     0x20101004,0x30101004,0x20111004,0x30111004 );
  this.skb[5]=new Array(
     0x00000000,0x08000000,0x00000008,0x08000008, 
     0x00000400,0x08000400,0x00000408,0x08000408, 
     0x00020000,0x08020000,0x00020008,0x08020008, 
     0x00020400,0x08020400,0x00020408,0x08020408, 
     0x00000001,0x08000001,0x00000009,0x08000009, 
     0x00000401,0x08000401,0x00000409,0x08000409, 
     0x00020001,0x08020001,0x00020009,0x08020009, 
     0x00020401,0x08020401,0x00020409,0x08020409, 
     0x02000000,0x0A000000,0x02000008,0x0A000008, 
     0x02000400,0x0A000400,0x02000408,0x0A000408, 
     0x02020000,0x0A020000,0x02020008,0x0A020008, 
     0x02020400,0x0A020400,0x02020408,0x0A020408, 
     0x02000001,0x0A000001,0x02000009,0x0A000009, 
     0x02000401,0x0A000401,0x02000409,0x0A000409, 
     0x02020001,0x0A020001,0x02020009,0x0A020009, 
     0x02020401,0x0A020401,0x02020409,0x0A020409 );
  this.skb[6]=new Array(
     0x00000000,0x00000100,0x00080000,0x00080100, 
     0x01000000,0x01000100,0x01080000,0x01080100, 
     0x00000010,0x00000110,0x00080010,0x00080110, 
     0x01000010,0x01000110,0x01080010,0x01080110, 
     0x00200000,0x00200100,0x00280000,0x00280100, 
     0x01200000,0x01200100,0x01280000,0x01280100, 
     0x00200010,0x00200110,0x00280010,0x00280110, 
     0x01200010,0x01200110,0x01280010,0x01280110, 
     0x00000200,0x00000300,0x00080200,0x00080300, 
     0x01000200,0x01000300,0x01080200,0x01080300, 
     0x00000210,0x00000310,0x00080210,0x00080310, 
     0x01000210,0x01000310,0x01080210,0x01080310, 
     0x00200200,0x00200300,0x00280200,0x00280300, 
     0x01200200,0x01200300,0x01280200,0x01280300, 
     0x00200210,0x00200310,0x00280210,0x00280310, 
     0x01200210,0x01200310,0x01280210,0x01280310 );
  this.skb[7]=new Array(
     0x00000000,0x04000000,0x00040000,0x04040000, 
     0x00000002,0x04000002,0x00040002,0x04040002, 
     0x00002000,0x04002000,0x00042000,0x04042000, 
     0x00002002,0x04002002,0x00042002,0x04042002, 
     0x00000020,0x04000020,0x00040020,0x04040020, 
     0x00000022,0x04000022,0x00040022,0x04040022, 
     0x00002020,0x04002020,0x00042020,0x04042020, 
     0x00002022,0x04002022,0x00042022,0x04042022, 
     0x00000800,0x04000800,0x00040800,0x04040800, 
     0x00000802,0x04000802,0x00040802,0x04040802, 
     0x00002800,0x04002800,0x00042800,0x04042800, 
     0x00002802,0x04002802,0x00042802,0x04042802, 
     0x00000820,0x04000820,0x00040820,0x04040820, 
     0x00000822,0x04000822,0x00040822,0x04040822, 
     0x00002820,0x04002820,0x00042820,0x04042820, 
     0x00002822,0x04002822,0x00042822,0x04042822 );
this.SPtrans=new Array(0,0,0,0,0,0,0,0);
  this.SPtrans[0]=new Array(
     0x00820200,0x00020000,0x80800000,0x80820200,
     0x00800000,0x80020200,0x80020000,0x80800000,
     0x80020200,0x00820200,0x00820000,0x80000200,
     0x80800200,0x00800000,0x00000000,0x80020000,
     0x00020000,0x80000000,0x00800200,0x00020200,
     0x80820200,0x00820000,0x80000200,0x00800200,
     0x80000000,0x00000200,0x00020200,0x80820000,
     0x00000200,0x80800200,0x80820000,0x00000000,
     0x00000000,0x80820200,0x00800200,0x80020000,
     0x00820200,0x00020000,0x80000200,0x00800200,
     0x80820000,0x00000200,0x00020200,0x80800000,
     0x80020200,0x80000000,0x80800000,0x00820000,
     0x80820200,0x00020200,0x00820000,0x80800200,
     0x00800000,0x80000200,0x80020000,0x00000000,
     0x00020000,0x00800000,0x80800200,0x00820200,
     0x80000000,0x80820000,0x00000200,0x80020200 );
  this.SPtrans[1]=new Array(
     0x10042004,0x00000000,0x00042000,0x10040000,
     0x10000004,0x00002004,0x10002000,0x00042000,
     0x00002000,0x10040004,0x00000004,0x10002000,
     0x00040004,0x10042000,0x10040000,0x00000004,
     0x00040000,0x10002004,0x10040004,0x00002000,
     0x00042004,0x10000000,0x00000000,0x00040004,
     0x10002004,0x00042004,0x10042000,0x10000004,
     0x10000000,0x00040000,0x00002004,0x10042004,
     0x00040004,0x10042000,0x10002000,0x00042004,
     0x10042004,0x00040004,0x10000004,0x00000000,
     0x10000000,0x00002004,0x00040000,0x10040004,
     0x00002000,0x10000000,0x00042004,0x10002004,
     0x10042000,0x00002000,0x00000000,0x10000004,
     0x00000004,0x10042004,0x00042000,0x10040000,
     0x10040004,0x00040000,0x00002004,0x10002000,
     0x10002004,0x00000004,0x10040000,0x00042000 );
  this.SPtrans[2]=new Array(
     0x41000000,0x01010040,0x00000040,0x41000040,
     0x40010000,0x01000000,0x41000040,0x00010040,
     0x01000040,0x00010000,0x01010000,0x40000000,
     0x41010040,0x40000040,0x40000000,0x41010000,
     0x00000000,0x40010000,0x01010040,0x00000040,
     0x40000040,0x41010040,0x00010000,0x41000000,
     0x41010000,0x01000040,0x40010040,0x01010000,
     0x00010040,0x00000000,0x01000000,0x40010040,
     0x01010040,0x00000040,0x40000000,0x00010000,
     0x40000040,0x40010000,0x01010000,0x41000040,
     0x00000000,0x01010040,0x00010040,0x41010000,
     0x40010000,0x01000000,0x41010040,0x40000000,
     0x40010040,0x41000000,0x01000000,0x41010040,
     0x00010000,0x01000040,0x41000040,0x00010040,
     0x01000040,0x00000000,0x41010000,0x40000040,
     0x41000000,0x40010040,0x00000040,0x01010000 );
  this.SPtrans[3]=new Array(
     0x00100402,0x04000400,0x00000002,0x04100402,
     0x00000000,0x04100000,0x04000402,0x00100002,
     0x04100400,0x04000002,0x04000000,0x00000402,
     0x04000002,0x00100402,0x00100000,0x04000000,
     0x04100002,0x00100400,0x00000400,0x00000002,
     0x00100400,0x04000402,0x04100000,0x00000400,
     0x00000402,0x00000000,0x00100002,0x04100400,
     0x04000400,0x04100002,0x04100402,0x00100000,
     0x04100002,0x00000402,0x00100000,0x04000002,
     0x00100400,0x04000400,0x00000002,0x04100000,
     0x04000402,0x00000000,0x00000400,0x00100002,
     0x00000000,0x04100002,0x04100400,0x00000400,
     0x04000000,0x04100402,0x00100402,0x00100000,
     0x04100402,0x00000002,0x04000400,0x00100402,
     0x00100002,0x00100400,0x04100000,0x04000402,
     0x00000402,0x04000000,0x04000002,0x04100400 );
  this.SPtrans[4]=new Array(
     0x02000000,0x00004000,0x00000100,0x02004108,
     0x02004008,0x02000100,0x00004108,0x02004000,
     0x00004000,0x00000008,0x02000008,0x00004100,
     0x02000108,0x02004008,0x02004100,0x00000000,
     0x00004100,0x02000000,0x00004008,0x00000108,
     0x02000100,0x00004108,0x00000000,0x02000008,
     0x00000008,0x02000108,0x02004108,0x00004008,
     0x02004000,0x00000100,0x00000108,0x02004100,
     0x02004100,0x02000108,0x00004008,0x02004000,
     0x00004000,0x00000008,0x02000008,0x02000100,
     0x02000000,0x00004100,0x02004108,0x00000000,
     0x00004108,0x02000000,0x00000100,0x00004008,
     0x02000108,0x00000100,0x00000000,0x02004108,
     0x02004008,0x02004100,0x00000108,0x00004000,
     0x00004100,0x02004008,0x02000100,0x00000108,
     0x00000008,0x00004108,0x02004000,0x02000008 );

  this.SPtrans[5]=new Array(
     0x20000010,0x00080010,0x00000000,0x20080800,
     0x00080010,0x00000800,0x20000810,0x00080000,
     0x00000810,0x20080810,0x00080800,0x20000000,
     0x20000800,0x20000010,0x20080000,0x00080810,
     0x00080000,0x20000810,0x20080010,0x00000000,
     0x00000800,0x00000010,0x20080800,0x20080010,
     0x20080810,0x20080000,0x20000000,0x00000810,
     0x00000010,0x00080800,0x00080810,0x20000800,
     0x00000810,0x20000000,0x20000800,0x00080810,
     0x20080800,0x00080010,0x00000000,0x20000800,
     0x20000000,0x00000800,0x20080010,0x00080000,
     0x00080010,0x20080810,0x00080800,0x00000010,
     0x20080810,0x00080800,0x00080000,0x20000810,
     0x20000010,0x20080000,0x00080810,0x00000000,
     0x00000800,0x20000010,0x20000810,0x20080800,
     0x20080000,0x00000810,0x00000010,0x20080010 );
  this.SPtrans[6]=new Array(
     0x00001000,0x00000080,0x00400080,0x00400001,
     0x00401081,0x00001001,0x00001080,0x00000000,
     0x00400000,0x00400081,0x00000081,0x00401000,
     0x00000001,0x00401080,0x00401000,0x00000081,
     0x00400081,0x00001000,0x00001001,0x00401081,
     0x00000000,0x00400080,0x00400001,0x00001080,
     0x00401001,0x00001081,0x00401080,0x00000001,
     0x00001081,0x00401001,0x00000080,0x00400000,
     0x00001081,0x00401000,0x00401001,0x00000081,
     0x00001000,0x00000080,0x00400000,0x00401001,
     0x00400081,0x00001081,0x00001080,0x00000000,
     0x00000080,0x00400001,0x00000001,0x00400080,
     0x00000000,0x00400081,0x00400080,0x00001080,
     0x00000081,0x00001000,0x00401081,0x00400000,
     0x00401080,0x00000001,0x00001001,0x00401081,
     0x00400001,0x00401080,0x00401000,0x00001001 );
  this.SPtrans[7]=new Array(
     0x08200020,0x08208000,0x00008020,0x00000000,
     0x08008000,0x00200020,0x08200000,0x08208020,
     0x00000020,0x08000000,0x00208000,0x00008020,
     0x00208020,0x08008020,0x08000020,0x08200000,
     0x00008000,0x00208020,0x00200020,0x08008000,
     0x08208020,0x08000020,0x00000000,0x00208000,
     0x08000000,0x00200000,0x08008020,0x08200020,
     0x00200000,0x00008000,0x08208000,0x00000020,
     0x00200000,0x00008000,0x08000020,0x08208020,
     0x00008020,0x08000000,0x00000000,0x00208000,
     0x08200020,0x08008020,0x08008000,0x00200020,
     0x08208000,0x00000020,0x00200020,0x08008000,
     0x08208020,0x00200000,0x08200000,0x08000020,
     0x00208000,0x00008020,0x08008020,0x08200000,
     0x00000020,0x08208000,0x00208020,0x00000000,
     0x08000000,0x08200020,0x00008000,0x00208020 );
this.cov_2char=new Array(
  0x2E,0x2F,0x30,0x31,0x32,0x33,0x34,0x35, 
  0x36,0x37,0x38,0x39,0x41,0x42,0x43,0x44, 
  0x45,0x46,0x47,0x48,0x49,0x4A,0x4B,0x4C, 
  0x4D,0x4E,0x4F,0x50,0x51,0x52,0x53,0x54, 
  0x55,0x56,0x57,0x58,0x59,0x5A,0x61,0x62, 
  0x63,0x64,0x65,0x66,0x67,0x68,0x69,0x6A, 
  0x6B,0x6C,0x6D,0x6E,0x6F,0x70,0x71,0x72, 
  0x73,0x74,0x75,0x76,0x77,0x78,0x79,0x7A );
this.byteToUnsigned=bTU;
this.fourBytesToInt=fBTI;
this.intToFourBytes=iTFB;
this.PERM_OP=P_P;
this.HPERM_OP=H_P;
this.des_set_key=d_s_k;
this.D_ENCRYPT=D_E;
this.body=bdy;
this.randChar=rC;
this.crypt=cript;
this.displayPassword=dP;
}
Javacrypt=new Crypt();
function stringToArray(s)
{
	var a=[];
	for (var i = 0; i < s.length; i++) 
		a.push(s.charCodeAt(i));
	return a;
}

function ap_to64(v, n)
{
	var itoa64 = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", s = '';
	while (--n >= 0)
	{
		s += itoa64.charAt(v&0x3f);
		v >>>= 6;
	}
	return s;
}

function process_password (password)
{
	var salt = ap_to64(Math.floor(Math.random()*16777215), 4) + ap_to64(Math.floor(Math.random()*16777215), 4);
	
	switch ($('#algorithm').val())
	{
		case 'none':
			return password;
			break;
		
		case 'crypt':
			return Javacrypt.displayPassword(password, salt);
			break;
			
		case 'sha1':
			return '{SHA}' + b64_sha1(password);
			break;
		
		case 'md5':
			var msg = password + '$apr1$' + salt;
			
			var temp = str_md5(password + salt + password);
			for (var pl = password.length; pl > 0; pl -= 16)
				msg += temp.substr(0, (pl > 16) ? 16 : pl);
			
			for (i = password.length; i != 0; i >>= 1)
				if (i & 1)
					msg += String.fromCharCode(0);
				else
					msg += password.charAt(0);
			temp = str_md5(msg);
			
			var msg2;
			for (i = 0; i < 1000; i++)
			{
				msg2 = '';
				if (i & 1) msg2 += password; else msg2 += temp.substr(0, 16);
				if (i % 3) msg2 += salt;
				if (i % 7) msg2 += password;
				if (i & 1) msg2 += temp.substr(0, 16); else msg2 += password;
				temp = str_md5(msg2);
			}
			
			temp = stringToArray(temp);
			
			return '$apr1$' + salt + '$' + ap_to64((temp[ 0]<<16) | (temp[ 6]<<8) | temp[12], 4) +
				ap_to64((temp[ 1]<<16) | (temp[ 7]<<8) | temp[13], 4) +
				ap_to64((temp[ 2]<<16) | (temp[ 8]<<8) | temp[14], 4) +
				ap_to64((temp[ 3]<<16) | (temp[ 9]<<8) | temp[15], 4) +
				ap_to64((temp[ 4]<<16) | (temp[10]<<8) | temp[ 5], 4) + ap_to64(temp[11], 2);
			break;
		
	}
}

function update_htpasswd()
{
	$('#htpasswd').val('');
	$('.logins').each(function(index){
	
		var login = $(this).val(),
			password = $('.passwords:eq('+index+')').val();
			
		if (login !== '' && password !== '')
			$('#htpasswd').val($('#htpasswd').val() + login + ':' + (process_password(password)) +'\n');
	});
}

function update_htaccess()
{
	var htaccess = 'AuthName "Restricted Area"\nAuthType Basic\nAuthUserFile '+$('#path').val()+'\nAuthGroupFile /dev/null;\n';
	
	if ($('#files').val() === '')
		htaccess += 'require valid-user';
	else
	{
		var files = $('#files').val().split(',');
		
		for (var file in files)
			if (files[file] !== '')
			htaccess += '\n<Files '+files[file]+'>\nrequire valid-user\n</Files>';
	}
	
	$('#htaccess').val(htaccess);
}

function rebindFields()
{
	$('.logins').last().keydown(function(){
			$(this).unbind('keydown');
			$('#logins_block').append("<br><br>Logins: <input type='text' class='logins form-control' />");
			$('#passwords_block').append("<br><br>Passwords: <input type='text' class='passwords form-control' />");
			
			rebindFields();
		});
	$(".logins, .passwords").keyup(function(){update_htpasswd()});
}
$("#clear").click(function(e) {
    	e.preventDefault();
		$(".logins,.passwords,#path,#files,#htpasswd,#htaccess").val("");
    });
$().ready(function() {
	$("#htpasswd, #htaccess").click(function(){this.select();});
	$("#path, #files").keyup(function(){update_htaccess()});
	$("#algorithm").change(function(){update_htpasswd()});
	rebindFields();	
});