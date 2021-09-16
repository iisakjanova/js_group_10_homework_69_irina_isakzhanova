import Layout from "./components/Layout/Layout";
import {Container, CssBaseline} from "@material-ui/core";

import TVShowSearch from "./containers/TVShowSearch/TVShowSearch";

const App = () => (
    <>
        <CssBaseline />
        <Layout>
            <Container>
                <TVShowSearch />
            </Container>
        </Layout>
    </>
);

export default App;
