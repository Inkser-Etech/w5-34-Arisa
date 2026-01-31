import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
// เพิ่ม type snackTypeเพื่อไม่ให้ text แสดงerror
type snackType = {
    snackName: string,
    snackPrice: string
}

export default function Home() {

    const [allSnacks, setAllSnacks] = useState<snackType[]>([])

    useEffect(() => {
        loadSnack()
    }, [allSnacks])
    // ใส่  allsnacks ใน[] เพื่อให้โหลดใหม่เมื่อมีการเปลี่ยนแปลงข้อมูล

    async function loadSnack() {
        const data = await AsyncStorage.getItem("snack")
        if (data != null)
            setAllSnacks(JSON.parse(data))
    }
    async function removeSnack(index: number) {
        const newSnacks = allSnacks.filter((_, i) => i !== index)
        //ดึงเอาตัวที่ไม่เราออกไปเหลือแค่อันที่ไม่ลบอยู่
        setAllSnacks(newSnacks)
        await AsyncStorage.setItem("snack", JSON.stringify(newSnacks))
        //
    }

    return (
        <View>
            <Text>หน้าแรก</Text>
            {/* FlatList ใช้แสดงรายการข้อมูล */}
            <FlatList
                data={allSnacks}
                // i แทน index
                keyExtractor={(_, i) => i.toString()}
                // item แทนข้อมูลของallSnacks
                renderItem={({ item, index }) => (
                    <View>
                        <Text>ชื่อ : {item.snackName.toString()}</Text>
                        <Text>ราคา : {item.snackPrice.toString()}</Text>
                        <TouchableOpacity onPress={() => removeSnack(index)}>
                            <Text style={{ color: 'red' }}>ลบ</Text>
                        </TouchableOpacity>
                        <Text>--------------------</Text>
                    </View>
                )}
            />

        </View>
    )

}