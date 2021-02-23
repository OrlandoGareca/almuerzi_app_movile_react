import React from 'react';
import {View,Text,Button,StyleSheet, AsyncStorage} from 'react-native';
import useFetch from '../hooks/useFetch';
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
export default ({navigation}) =>{
    const id = navigation.getParam('_id')
    const {loading,data} = useFetch(`https://serverless.malaleche2.vercel.app/api/meals/${id}`)
    console.log(data)
    return(
      
        <View style={styles.container}>
            { loading ? <Text>Cargando...!</Text> :
                <>
                    <Text>{data._id}</Text>
                    <Text>{data.name}</Text>
                    <Text>{data.desc}</Text>
                    <Button title="Aceptar" onPress={() => {
                        AsyncStorage.getItem('token')
                        .then( x => {
                            if (x) {
                                fetch('https://serverless.malaleche2.vercel.app/api/orders/',{
                                    method:'POST',
                                    headers:{
                                        'Content-Type':'application/json',
                                        authorization:x,
                                    },
                                    body: JSON.stringify({
                                        meal_id: id,
                                      
                                    })
                                }).then(x => {
                                    console.log(x.status)
                                    if (x.status !== 201) {
                                        return alert('La orden no pudo ser generada')
                                    }
                                    alert('Order fue generada con exito')
                                    navigation.navigate('Meals')
                                })
                            }
                        })
                       
                    }} />
                    <Button title="Cancelar" onPress={() => navigator.navigate('Meals')} />
                </>
            }
        </View>
    
    )
}