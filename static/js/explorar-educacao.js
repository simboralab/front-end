(function(){
  const cat = 'Educação';
  window.__fixedCategory = cat;
  const u = new URL(window.location.href);
  if (!u.searchParams.get('category')) {
    u.searchParams.set('category', cat);
    window.history.replaceState({}, '', u.pathname + '?' + u.searchParams.toString());
  }
})();
