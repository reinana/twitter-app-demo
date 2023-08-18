import React, { useState } from 'react';
// material ui
import { 
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    IconButton } from '@mui/material';
// icons
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// style
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './Auth.module.css'
// firebase関連
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, provider, storage } from '../firebase';
// uuid
import { v4 as uuidv4 } from 'uuid';

// Material ui templateからまるっとコピペ
function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://recursionist.io/">
                Recursion Twitter Demo
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Auth: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [avatarImage, setAvatarImage] = useState<File | null>(null);
    const [isLogin, setIsLogin] = useState(true);

    // google認証でログインする
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).catch((error) => alert(error.message));
    }
    // Emailとpasswordでログインする
    const signInEmail = () => {
        signInWithEmailAndPassword(auth, email, password).catch((error) => alert(error.message));
    }
    // Emailとpasswordで新規アカウント登録する
    const signUpEmail = async () => {

        let fileName = "";
        if (avatarImage) {
            // 一意のファイルネームを作る
            const uniqueId = uuidv4();
            console.log('A unique ID:', uniqueId);
            fileName = avatarImage.name + "_" + uniqueId;
        }
        // emailとパスワードで新規アカウントを作る
        await createUserWithEmailAndPassword(auth, email, password);

        console.log(auth)

        let url = "";
            if (avatarImage) {
                // ファイルへのパスを作る
                const storageRef = ref(storage, `avatars/${fileName}`)
                
                // アップロードする
                await uploadBytes(storageRef, avatarImage)
                // アップロードしたファイルへのURLを取得
                url = await getDownloadURL(storageRef)
            }
            if(auth.currentUser){
                await updateProfile(auth.currentUser,
                    {
                        displayName: username,
                        photoURL: url
                    }
                )
                console.log(auth.currentUser)
        }
        console.log("uploaded")
    }

    // avatar画像のセット
    const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files![0]) {
            setAvatarImage(e.target.files![0]);
            e.target.value = ""
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {isLogin ? "Login" : "Register"}
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        {!isLogin && (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Box textAlign='center'>

                                    <IconButton>
                                        <label>
                                            {avatarImage ?
                                                (<>
                                                    <AccountCircleIcon fontSize='large' className={styles.login_addIconLoaded} />
                                                    <p>{avatarImage.name}</p>
                                                </>)
                                                : (
                                                    <>
                                                        <AccountCircleIcon fontSize='large' className={styles.login_addIcon} />
                                                        <p>選択されていません</p>
                                                    </>
                                                )}
                                            <input
                                                className={styles.login_hiddenIcon}
                                                type='file'
                                                onChange={(e) => onChangeImageHandler(e)}
                                            />
                                        </label>
                                    </IconButton>
                                </Box>
                            </>
                        )}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            startIcon={<EmailIcon />}
                            onClick={
                                isLogin
                                    ? async () => {
                                        try {
                                            await signInEmail();
                                        } catch (err: any) {
                                            alert(err.message)
                                        }
                                    }
                                    : async () => {
                                        try {
                                            await signUpEmail();
                                        } catch (err: any) {
                                            alert(err.message)
                                        }
                                    }
                            }
                        >
                            {isLogin ? "Login" : "Register"}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <span onClick={() => alert("Sorry! Not implemented yet")}>
                                    Forgot password?
                                </span>
                            </Grid>
                            <Grid item>
                                <span onClick={() => setIsLogin(!isLogin)} className={styles.login_toggleMode}>
                                    {isLogin ? "Create new account?" : "Back to Login"}
                                </span>
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={signInWithGoogle}
                        >
                            Sign In with Google
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default Auth;