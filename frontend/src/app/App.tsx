import "./styles/index.scss";
import { observer } from "mobx-react-lite";
import { useTheme, ThemeProvider } from "@/app/theme";
import rootStore from "@/app/stores/RootStore.ts";
import { Provider } from "@/app/stores/useStore.tsx";
import MainPage from "@/pages/MainPage/MainPage.tsx";

const _App = observer(() => {
  const { theme } = useTheme();
  return (
    <div className={`app ${theme}`}>
        <MainPage />
    </div>
  );
});

function App() {
  return (
    <>
      <Provider value={rootStore}>
        <ThemeProvider>
          <_App />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
