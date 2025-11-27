// Adicionar interatividade às abas de filtro
document.querySelectorAll('.filter-tab').forEach(aba => {
    aba.addEventListener('click', function () {
        // Remover classe ativo de todas as abas
        document.querySelectorAll('.filter-tab').forEach(t => {
            t.classList.remove('active');
        });

        // Adicionar classe ativo à aba clicada
        this.classList.add('active');
    });
});