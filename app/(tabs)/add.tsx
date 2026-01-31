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
        <View>
            <Text>เพิ่มข้อมูล {name} | {price} </Text>
            {/*ช่องรับชื่อ*/}
            <TextInput style={myStyle.i} value={name} onChangeText={setName} />
            {/*ช่องรับราคา*/}
            <TextInput style={myStyle.i} value={price} onChangeText={setPrice} />

            <TouchableOpacity onPress={addSnack}>
                <Text>บันทึก</Text>
            </TouchableOpacity>

        </View>
    )

}
const myStyle = StyleSheet.create({
    i: {
        width: "80%",
        borderWidth: 1,
    }
})