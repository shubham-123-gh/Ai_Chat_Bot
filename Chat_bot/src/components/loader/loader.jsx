import "./loader.css"

const Loader = ()=>
{
    return(
        <div className="loaderContainer">
            <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
            <div>
                working...
            </div>
        </div>
    )
}
export default Loader;