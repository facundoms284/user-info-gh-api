import '../stylessheet/Welcome.css'

const Welcome = () => {
    return (
    <div className='welcome-wrapper'>
        <h1>Welcome to GitHub Profiles</h1>
        <p>This is a simple web app that allows you to search for a GitHub user and see their profile information.</p>
        <p>To use the app, enter a GitHub username in the search bar and click the 'Search' button. </p>
    </div>
    )
};

export default Welcome;