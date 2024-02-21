document.addEventListener("DOMContentLoaded", function() {
    const user_name = document.querySelector('.user-name');
    const user_email = document.querySelector('.user-email');
    const user_phone = document.querySelector('.user-phone');
    const generateCodeButton = document.querySelector('.generate-qr-code');
    let qrImage = document.querySelector('.qr-image');
    let qrCanvas = document.querySelector('.qr-canvas');
    const loading = document.querySelector('.loading');

    generateCodeButton.onclick = async () => {
        qrImage.src = ''
        let name = user_name.value;
        let email = user_email.value;
        let phone = user_phone.value;
        let userData = `Name: ${name} Email: ${email} Phone: ${phone}`;
        let imgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${userData}`;

        loading.style.display = 'block';
        if(name != '' || email != '' || phone != ''){
            let response = await fetch(imgSrc);
            let data = await response.blob();
            //URL.createObjectURL - src or download requires a url and URL.createObjectURL creates a temporary url to be used. Initially it is an objecy i.e. data variable returns an object and it is then converted to url by this method and then passed into image.src
            qrImage.src = URL.createObjectURL(data);
            loading.style.display = 'none';
        }else{
            alert('Please enter valid field data!!!');
            loading.style.display = 'none';
        }
            // loading.style.display = 'none';

        //URL.revokerObjectURL(blob) - It is good for memory management because in large programs, URL.createObjectURL(blob) will create a lot of temporary urls so it will lead to performance issues. Therefore we use this method to revoke unnecessary temporary urls
        URL.revokeObjectURL(data);
    };
});
