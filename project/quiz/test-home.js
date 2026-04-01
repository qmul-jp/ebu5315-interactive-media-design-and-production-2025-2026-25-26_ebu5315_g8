document.addEventListener('DOMContentLoaded', function () {
    const menuLinks = document.querySelectorAll('.menu-link');
    const contentArea = document.querySelector('.content');

    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // 阻止默认跳转（如果是#链接），实际项目中可改为跳转子页面
            const target = this.dataset.target;
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                contentArea.innerHTML = `<p>正在加载「${this.textContent}」界面...</p>`;
                // 后续可在这里加载对应模块内容或跳转
            }
        });
    });
});