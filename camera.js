const axios = require('axios');
const parser = require('fast-xml-parser')
const terminalImage = require('terminal-image')

//API camaras de trafico de Madrid. 

module.exports = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://datos.madrid.es/egob/catalogo/202088-0-trafico-camaras.kml')
            .then(async function (response) {
                //Libreria fast-xml-parser para parsear los datos recibidos por consola de las camaras de Madrid.
                const jsonObj = parser.parse(response.data);
                //console.log(jsonObj)
                const placemark = jsonObj.kml.Document.Placemark
                const randomNum = Math.floor(Math.random() * (placemark.length - 1))
                const infoCamera = placemark[randomNum].ExtendedData.Data;
                const urlImage = `http://informo.munimadrid.es/cameras/Camara${(infoCamera[0].Value).toString().padStart(5,'0')}.jpg`

                console.log(urlImage);

                const body = await axios({
                    method: 'get',
                    url: urlImage,
                    responseType: 'arraybuffer',

                })
                console.log(await terminalImage.buffer(body.data));
                resolve();
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    })

}