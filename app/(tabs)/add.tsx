import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Add() {
    //ประกาศตัวแปร
    // name เก็บค่า
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [allSnacks, setAllSnacks] = useState("")

    useEffect(() => {
        loadSnack()
    }, [allSnacks])

    async function loadSnack() {
        const data = await AsyncStorage.getItem("snack")
        if (data != null)
            setAllSnacks(JSON.parse(data))
    }



    async function addSnack() {
        //เตรีียมข้อมูล
        const snack = {
            snackName: name,
            snackPrice: price
        }
        // ทดสอบ
        console.log(snack)
        // ...คือข้อมูลทั้งหมดใน allSnacks
        const newSnacks = [...allSnacks, snack]
        //เจสันคือการแปลงนข้อมูลให้อยู่ในรูปแบบข้อความ
        await AsyncStorage.setItem("snack", JSON.stringify(newSnacks))


        //เคลียร์ข้อมูล
        setName("")
        setPrice("")
        setAllSnacks
    }

    return (
        <View style={myStyle.container}>

            <View style={myStyle.card}>
            <Text style={myStyle.title}>เพิ่มข้อมูล</Text>
            {/*ช่องรับชื่อ*/}

            <Text style={myStyle.preview}>
                    {name} | {price}
                </Text>


            <TextInput 
            style={myStyle.i} 
            value={name} 
            placeholder="ชื่อสินค้า"
            onChangeText={setName}/>
           
            <TextInput
            style={myStyle.i}
            value={price}
             placeholder="ราคา" 
            onChangeText={setPrice} />

             {/*ช่องรับราคา*/}
          


            <TouchableOpacity style={myStyle.button} onPress={addSnack}>
                <Text style={myStyle.buttonText}>บันทึก</Text>
            </TouchableOpacity>
        </View>
        </View>
    )

}
const myStyle = StyleSheet.create({
    i: {
        width: "80%",
        borderWidth: 1,
        backgroundColor: "#f2f2f2",
       
    },
        container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        justifyContent: "center",
        alignItems: "center"
    },

    card: {
        width: "90%",
        
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        elevation: 5, 
        shadowColor: "#000", 
        shadowOpacity: 0.2,
        shadowRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center"
    },

    preview: {
        textAlign: "center",
        marginBottom: 15,
        color: "gray",
        borderRadius:10
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        backgroundColor: "#fafafa"
    },

    button: {
        backgroundColor: "#29B6F6",
        padding: 15,
        borderRadius: 10,
        alignItems: "center"
    },

    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        width: "80%", 
     alignSelf: "center"
    }

})
