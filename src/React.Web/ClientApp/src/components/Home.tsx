import React, { useRef } from "react";

const Home = () => {

  // const products = useSelector(productsList)

  const textInputRef = useRef<HTMLInputElement>(null);

  const submitTextHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const textInput = textInputRef.current!.value;
    console.log(textInput);
  }
  
  return <React.Fragment>
        <h1>Home</h1>
        <form onSubmit={submitTextHandler} className="form-group">
          <label htmlFor="search-text">
            <input type="text" className="form-control" ref={textInputRef} aria-describedby="helpId" />
          </label>
          <button type="submit" className="btn btn-success">Submit</button>
          </form>

          {/* {products.map((product, index) => {
            return <div className="card mt-4 col-4" key={index}>
                <img className="card-img-top" style={{ width: "auto", height: "200px" }} src="https://hoanghamobile.com/Uploads/Originals/2019/09/17/201909171415023411_123.png;width=820;height=550;watermark=logo;crop=auto;format=jpg" alt="imageProduct"/>
                <div className="card-body">
                  <h4 className="card-title">{product.name}</h4>
                  <p className="card-text">{product.price}</p>
                </div>
              </div>
          })} */}

    </React.Fragment>;
};

export default Home;