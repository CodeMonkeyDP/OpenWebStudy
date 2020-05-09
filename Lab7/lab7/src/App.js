import React, { useState } from 'react';

function App() {
  const [species, setSpecies] = useState('')
  const [value, setValue] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [ID, setID] = useState('')
  const [image, setImage] = useState('')
  const [img, setImg] = useState('')

  /// Функция получения всех параметров
  function startSearch(event) { 
    event.preventDefault()
    if (species.trim()) {
      var animalspecies = null;
      var animalvalue = null;
      
      animalspecies = species;
      animalvalue = value;

      let animanlsJSON = {
        species: animalspecies, 
        value: animalvalue,
      };

      console.log(animanlsJSON);

      fetch('/api/find', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(animanlsJSON)
        })
        .then(response => {
          if(!response.ok) {
            console.log(response);
            throw new Error(response.statusText)
          }
          return response;
        })
            .then(response => response.json())
            .then(result => {
              console.log(result)
              if (result.error !== "Image not found")
              {
                setValue(result.value)
                setWidth(result.width)
                setHeight(result.height)
                setID(result.ID)
                setImage('')
              }
              else
              setImage('Record not find!')
            });
    }
  }

  /// Функция получения картинки
  function sendReq(event) {
    event.preventDefault()
    if (species.trim()) {
      var animalspecies = null;
      var animalvalue = null;
      var imgwidth = null;
      var imgheight = null;
      var imgID = null;
      
      animalspecies = species;
      animalvalue = value;
      imgwidth = width;
      imgheight = height;
      imgID = ID;

      let animalsJSON = {
        species: animalspecies, 
        value: animalvalue,
        width: imgwidth, 
				height: imgheight,
				ID: imgID
      };


      console.log(animalsJSON)

      fetch('/api/animal', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(animalsJSON)
        })
        .then(response => {
          if(!response.ok) {
            throw new Error(response.statusText)
          }
          return response;
        })
            .then(response => response.json())
            .then(result => {
              console.log(result)
              if (result.image != null)
              {
                setImage(result.image)
                setImg(result.image)
              }
              else
              setImage('Image not found')
            });
    }
  }

  return (
    <div className="wrapper">
      <label>
          <a>Вид: </a>
          <a style={{marginLeft: 150}}>Значение: </a>
          <br></br>
          <input
            value={species} 
            onChange={event => setSpecies(event.target.value)} 
          />

          <input 
            style={{marginLeft: 15}} 
            value={value} 
            onChange={event => setValue(event.target.value)} 
          /><p></p>

          <a>Ширина: </a>
          <a style={{marginLeft: 117}}>Высота: </a>
          <br></br>
          <input 
            value={width} 
            onChange={event => setWidth(event.target.value)} 
          ></input>
          <input 
            style={{marginLeft: 15}}
            value={height} 
            onChange={event => setHeight(event.target.value)} 
          ></input><p></p>

          <a>ID:</a>
          <br></br>
          <input
            value={ID} 
            onChange={event => setID(event.target.value)}             
          ></input><p></p>  

          <a>Изображение:</a>
          <br></br>
          <input 
            value={image} 
            onChange={event => setImage(event.target.value)}             
          ></input><p></p> 

          <input 
            type="submit" 
            value="Поиск" 
            onClick={sendReq}
          />
          <p></p>
          <input 
            type="submit" 
            value="Найти недостающие параметры" 
            onClick={startSearch}
          /><p></p>

        <img 
          src={img} 
          onChange={event => setImg(event.target.value)}
        />
      </label>
    </div>
  ); 

}

  


export default App;
