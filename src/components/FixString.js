function FixString(htmlStr) {
  htmlStr = htmlStr.replaceAll("&quot;", '"');
  htmlStr = htmlStr.replaceAll("&#039;", "'");
  htmlStr = htmlStr.replaceAll("&ndash;", "-");
  htmlStr = htmlStr.replaceAll("&uuml;", "Ü");
  htmlStr = htmlStr.replaceAll("&amp;", "&");
  htmlStr = htmlStr.replaceAll("&shy;", "-");

  return htmlStr;
}

export default FixString;
