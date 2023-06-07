import { NativeBaseProvider } from 'native-base';
import { useEffect, useState } from 'react';
import { UserContext } from './src/core/contexts';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { getDecodedToken, getToken } from './src/core/services';
import PrivateRoute from './src/identity/components/PrivateRoute';
import { SignupView, LoginView, HomeView, UserView, SearchView, RecipesView, MyRecipesView, CreateRecipeView, UpdateRecipeView, ViewRecipeView } from './src/routes'
import { QueryClient, QueryClientProvider } from 'react-query';
import FetchingBackdrop from './src/components/fetching-backdrop';
import { StyleSheet, Text, View } from 'react-native';

const queryClient = new QueryClient();


export default function App() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [user, setUser] = useState({ username: '' })

  useEffect(() => {
    async function CheckAuth() {
      const token = await getToken();
      if (token) {
        const data = getDecodedToken(token);
        setUser({ username: data.unique_name, token: token })
        setIsCheckingAuth(false);
      }
      setIsCheckingAuth(false);
    }
    CheckAuth();
  }, [])

  const renderApp = () => {
    return (
      <>
        <NativeBaseProvider>
          <UserContext.Provider value={{ user, setUser }}>
            <QueryClientProvider client={queryClient}>
              <FetchingBackdrop/>
              <NativeRouter>
                <Routes>
                  <Route path="/"  element={<PrivateRoute><HomeView/></PrivateRoute>}>
                    <Route path='/' element={<PrivateRoute><RecipesView/></PrivateRoute>}></Route>
                    <Route path='recipes' element={<PrivateRoute><RecipesView/></PrivateRoute>}></Route>
                    <Route path='user' element={<PrivateRoute><UserView/></PrivateRoute>}></Route>
                    <Route path='search' element={<PrivateRoute><SearchView/></PrivateRoute>}></Route>
                  </Route>
                  <Route exact path="/my-recipes" element={<PrivateRoute><MyRecipesView/></PrivateRoute>}></Route>
                  <Route exact path="/login" element={<LoginView />}></Route>
                  <Route exact path="/signup" element={<SignupView/>}></Route>
                  <Route path='/recipes'>
                      <Route exact path='create' element={<PrivateRoute><CreateRecipeView/></PrivateRoute>}/>
                      <Route exact path='update/:id' element={<PrivateRoute><UpdateRecipeView/></PrivateRoute>}/>
                      <Route exact path='view/:id' element={<PrivateRoute><ViewRecipeView/></PrivateRoute>}/>
                  </Route>
                  {/* <Route exact path="/tasklists" element={<PrivateRoute><TasklistsView/></PrivateRoute>}></Route>
                          <Route exact path="/tasklists/update/:id" element={<PrivateRoute><EditTasklistView/></PrivateRoute>}></Route>
                          */
                          }
                </Routes>
              </NativeRouter>
            </QueryClientProvider>
          </UserContext.Provider>
        </NativeBaseProvider>
      </>
    );
  }

  return (
    <>
      {isCheckingAuth ? <Loading/> : renderApp()}
    </>
  );
  
}
const Loading = () => {
  return (
      <View style={styles.loadingContainer}>
        <Text style={{fontWeight: '600', fontSize: 20}}>Loading...</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#facc15'
  },
})