let keranjang = [];

// Tambah Barang
document.getElementById("tambahBtn").addEventListener("click", function () {
    const nama = document.getElementById("namaBarang").value;
    const harga = parseInt(document.getElementById("hargaBarang").value);
    const jumlah = parseInt(document.getElementById("jumlahBarang").value);

    if (!nama || !harga || !jumlah) {
        alert("Mohon isi semua data barang!");
        return;
    }

    keranjang.push({
        nama,
        harga,
        jumlah,
        total: harga * jumlah
    });

    tampilkanTabel();
    hitungTotal();
});

// Tampilkan Tabel
function tampilkanTabel() {
    const tbody = document.getElementById("tabelBody");
    tbody.innerHTML = "";

    keranjang.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.nama}</td>
                <td>${item.harga}</td>
                <td>${item.jumlah}</td>
                <td>${item.total}</td>
                <td><button class="delete-btn" onclick="hapusItem(${index})">Hapus</button></td>
            </tr>
        `;
    });
}

// Hapus Item
function hapusItem(i) {
    keranjang.splice(i, 1);
    tampilkanTabel();
    hitungTotal();
}

// Hitung Total
function hitungTotal() {
    let subtotal = 0;

    keranjang.forEach(i => subtotal += i.total);

    const diskonPersen = parseInt(document.getElementById("diskon").value) || 0;
    const diskon = subtotal * (diskonPersen / 100);

    const pajak = (subtotal - diskon) * 0.11;
    const totalAkhir = subtotal - diskon + pajak;

    document.getElementById("subtotal").innerText = subtotal;
    document.getElementById("pajak").innerText = pajak.toFixed(2);
    document.getElementById("totalAkhir").innerText = totalAkhir.toFixed(2);

    // Untuk Struk
    document.getElementById("strukSubtotal").innerText = subtotal;
    document.getElementById("strukDiskon").innerText = diskon.toFixed(2);
    document.getElementById("strukPajak").innerText = pajak.toFixed(2);
    document.getElementById("strukTotalAkhir").innerText = totalAkhir.toFixed(2);
}

// RESET
document.getElementById("resetBtn").addEventListener("click", function () {
    keranjang = [];
    tampilkanTabel();
    hitungTotal();
});

// CETAK STRUK
document.getElementById("cetakBtn").addEventListener("click", function () {
    const strukBody = document.getElementById("strukBody");
    strukBody.innerHTML = "";

    keranjang.forEach(item => {
        strukBody.innerHTML += `
            <tr>
                <td>${item.nama}</td>
                <td>${item.harga}</td>
                <td>${item.jumlah}</td>
                <td>${item.total}</td>
            </tr>
        `;
    });

    const waktu = new Date().toLocaleString();
    document.getElementById("waktuTransaksi").innerText = waktu;

    window.print();
});
