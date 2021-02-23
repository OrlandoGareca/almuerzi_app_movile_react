import React from 'react';
import {Text,TextInput,View,StyleSheet, Button, Alert} from 'react-native';
import useForm from '../hooks/useForm';
const styles = StyleSheet.create({
    title:{
        fontSize:24,
        marginBottom:16,
    },  
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:20,
    },
    input:{
        height:40,
        borderColor:'#ccc',
        borderWidth:1,
        alignSelf:'stretch',
        marginBottom:10,
        paddingHorizontal:10
        
    },
    button:{
        marginTop:100
    }
})

export default ({navigation}) => {
    const initialState = {
        email: '',
        password: '',
    }
    const onSubmit = values => {
       // console.log(values);
       fetch('https://serverless.malaleche2.vercel.app/api/auth/register',{
           method:'POST',
           headers:{
               'Content-Type':'Application/json',
           },
           body: JSON.stringify(values),
       })
       .then(x => x.text())
       .then(x => {
           if(x=== 'usuario creado con exito'){
               return Alert.alert(
                   'Exito',
                   x,
                   [
                       { text: 'Ir al inicio', onPress: () => navigation.navigate('Login') }
                   ]
               )
           }
           Alert.alert(
               'Error',
               x,
           )

       })
    }
    const {subscribe, handleSubmit,inputs} =useForm(initialState,onSubmit)
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput
            autoCapitalize='none' 
            value={inputs.email} 
            onChangeText={subscribe('email')}  
            placeholder="Correo Electronico" 
            style={styles.input}/>
            <TextInput 
            autoCapitalize='none' 
            value={inputs.password} 
            onChangeText={subscribe('password')}  
            placeholder="Contraseña" 
            style={styles.input} 
            secureTextEntry={true}/>
            <View  >
            <Button style={styles.button} title="Enviar" onPress={handleSubmit} />
            <Button  style={styles.button} title="Volver al inicio" onPress={() => navigation.navigate('Login')} />
            </View>
        </View>
    )
}