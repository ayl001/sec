// Gestion de la visibilité des séries
document.getElementById('change').addEventListener('click', function() {
    let series = document.querySelectorAll('.series');
    let visibleIndex = Array.from(series).findIndex(serie => serie.classList.contains('visible'));

    series[visibleIndex].classList.remove('visible');

    let nextIndex = (visibleIndex + 1) % series.length;

    series[nextIndex].classList.add('visible');
});

// Gestion du panier
const cart = {};

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const item = this.getAttribute('data-item');
        const quantity = parseInt(this.previousElementSibling.value);
        
        if (cart[item]) {
            cart[item] += quantity;
        } else {
            cart[item] = quantity;
        }

        updateCart();
    });
});

function updateCart() {
    const cartTableBody = document.querySelector('#cartTable tbody');
    cartTableBody.innerHTML = '';

    for (let item in cart) {
        let row = document.createElement('tr');
        
        let itemNameCell = document.createElement('td');
        itemNameCell.textContent = item;
        row.appendChild(itemNameCell);

        let itemQuantityCell = document.createElement('td');
        itemQuantityCell.textContent = cart[item];
        row.appendChild(itemQuantityCell);

        let actionCell = document.createElement('td');
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Retirer';
        removeButton.classList.add('remove-item');
        removeButton.addEventListener('click', function() {
            delete cart[item];
            updateCart();
        });
        actionCell.appendChild(removeButton);
        row.appendChild(actionCell);

        cartTableBody.appendChild(row);
    }
}
