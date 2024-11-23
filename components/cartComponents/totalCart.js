export const totalRow = (suma) => { 
    return`
    <tr>
        <td colspan="4" class="px-4 py-2 text-center text-lg font-bold border-2 border-gray-800">
            Total: $${suma.toFixed(2)}
        </td>
    </tr>`;
}


