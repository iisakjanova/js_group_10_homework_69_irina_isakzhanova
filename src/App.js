import Layout from "./components/Layout/Layout";
import {Container, CssBaseline} from "@material-ui/core";
import {Route, Switch} from "react-router-dom";

import TVShowSearch from "./containers/TVShowSearch/TVShowSearch";
import TVShow from "./containers/TVShow/TVShow";

const App = () => (
    <>
        <CssBaseline />
        <Layout>
            <Container>
                <Switch>
                    <Route path="/" exact component={TVShowSearch}/>
                    <Route path="/shows/:id" component={TVShow}/>
                    <Route render={() => <h1>Not found</h1>}/>
                </Switch>
            </Container>
        </Layout>
    </>
);

export default App;
