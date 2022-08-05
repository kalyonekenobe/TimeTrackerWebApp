
import  {FC, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authUserAction } from '../../store/actions/auth/authActions';
import { getCookie, refreshTokenKey } from '../../Cookie/Cookie';
import { EmptyAuthUser } from '../../type/User/AuthUser';

export const AuthenticationForm: FC = () => {
    const dispatch = useAppDispatch();
    const isLoadingAuth =useAppSelector(s=>s.rootReducer.auth.isLoading) 
    const [state, setState] = useState(EmptyAuthUser);
    const accessToken = useAppSelector(s=>s.rootReducer.auth.accessToken);
    const refreshToken = getCookie(refreshTokenKey);

    const navigate = useNavigate();
    useEffect(()=>{
        if(accessToken!=null){
            navigate("/");
        }
        if(refreshToken==null){
            navigate("/welcome");
        }
    },[accessToken,refreshToken]);


    return (
        <form className={"authentication-form"}>
             <div className={"form-group"}>
                <div className={"form-item w-100"}>
                    <span style={{margin: "0 auto", fontSize: "25px",fontWeight: "2px"}}>TimeTracker</span>
                </div>
                <div className={"form-item w-100"}>
                    <input id={'login'} placeholder={'Login'} value={state.email} onChange={(e) => setState({...state, email: e.target.value})} type="email"/>
                </div>
                <div className={"form-item w-100"}>
                    <input id={'password'} placeholder={'Password'} value={state.password} onChange={(e) =>
                     {setState({...state, password: e.target.value})
                     console.log(e.target.value);}}
                type="password"/>
                </div>
                <div className={"form-item w-100"}>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        dispatch(authUserAction(state));
                    }} className={"button dark-button w-100"}>
                        {isLoadingAuth==true?<div className="loader"></div>:<>Sign In</>}
          
                    </button>
                </div>
            </div>
        </form>
    );
};