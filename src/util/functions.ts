// export function latToCyr(string: string) {
//
//     var cyrillic = 'А_Б_В_Г_Д_Ђ_Е_Ё_Ж_З_И_Й_Ј_К_Л_Љ_М_Н_Њ_О_П_Р_С_Т_Ћ_У_Ф_Х_Ц_Ч_Џ_Ш_Щ_Ъ_Ы_Ь_Э_Ю_Я_а_б_в_г_д_ђ_е_ё_ж_з_и_й_ј_к_л_љ_м_н_њ_о_п_р_с_т_ћ_у_ф_х_ц_ч_џ_ш_щ_ъ_ы_ь_э_ю_я'.split('_')
//     var latin = 'A_B_V_G_D_Đ_E_Ë_Ž_Z_I_J_J_K_L_Lj_M_N_Nj_O_P_R_S_T_Ć_U_F_H_C_Č_Dž_Š_Ŝ_ʺ_Y_ʹ_È_Û_Â_a_b_v_g_d_đ_e_ë_ž_z_i_j_j_k_l_lj_m_n_nj_o_p_r_s_t_ć_u_f_h_c_č_dž_š_ŝ_ʺ_y_ʹ_è_û_â'.split('_')
//
//     return string.split('').map(function(char: string) {
//         var index = latin.indexOf(char)
//         if (!~index)
//             return char
//         return cyrillic[index]
//     }).join('')
// }
export function latToCyr(unesenText: string) {
    unesenText = unesenText.replace(/a/g,'а');
    unesenText = unesenText.replace(/b/g,'б');
    unesenText = unesenText.replace(/c/g,'ц');
    unesenText = unesenText.replace(/č/g,'ч');
    unesenText = unesenText.replace(/ć/g,'ћ');
    unesenText = unesenText.replace(/d/g,'д');
    unesenText = unesenText.replace(/đ/g,'ђ');
    unesenText = unesenText.replace(/e/g,'е');
    unesenText = unesenText.replace(/f/g,'ф');
    unesenText = unesenText.replace(/g/g,'г');
    unesenText = unesenText.replace(/h/g,'х');
    unesenText = unesenText.replace(/i/g,'и');
    unesenText = unesenText.replace(/j/g,'ј');
    unesenText = unesenText.replace(/k/g,'к');
    unesenText = unesenText.replace(/l/g,'л');
    unesenText = unesenText.replace(/m/g,'м');
    unesenText = unesenText.replace(/n/g,'н');
    unesenText = unesenText.replace(/o/g,'о');
    unesenText = unesenText.replace(/p/g,'п');
    unesenText = unesenText.replace(/r/g,'р');
    unesenText = unesenText.replace(/s/g,'с');
    unesenText = unesenText.replace(/š/g,'ш');
    unesenText = unesenText.replace(/t/g,'т');
    unesenText = unesenText.replace(/u/g,'у');
    unesenText = unesenText.replace(/v/g,'в');
    unesenText = unesenText.replace(/z/g,'з');
    unesenText = unesenText.replace(/ž/g,'ж');
    unesenText = unesenText.replace(/A/g,'А');
    unesenText = unesenText.replace(/B/g,'Б');
    unesenText = unesenText.replace(/C/g,'Ц');
    unesenText = unesenText.replace(/Č/g,'Ч');
    unesenText = unesenText.replace(/Ć/g,'Ћ');
    unesenText = unesenText.replace(/D/g,'Д');
    unesenText = unesenText.replace(/Đ/g,'Ђ');
    unesenText = unesenText.replace(/E/g,'Е');
    unesenText = unesenText.replace(/F/g,'Ф');
    unesenText = unesenText.replace(/G/g,'Г');
    unesenText = unesenText.replace(/H/g,'Х');
    unesenText = unesenText.replace(/I/g,'И');
    unesenText = unesenText.replace(/J/g,'Ј');
    unesenText = unesenText.replace(/K/g,'К');
    unesenText = unesenText.replace(/L/g,'Л');
    unesenText = unesenText.replace(/M/g,'М');
    unesenText = unesenText.replace(/N/g,'Н');
    unesenText = unesenText.replace(/O/g,'О');
    unesenText = unesenText.replace(/P/g,'П');
    unesenText = unesenText.replace(/R/g,'Р');
    unesenText = unesenText.replace(/S/g,'С');
    unesenText = unesenText.replace(/Š/g,'Ш');
    unesenText = unesenText.replace(/T/g,'Т');
    unesenText = unesenText.replace(/U/g,'У');
    unesenText = unesenText.replace(/V/g,'В');
    unesenText = unesenText.replace(/Z/g,'З');
    unesenText = unesenText.replace(/Ž/g,'Ж');
    unesenText = unesenText.replace(/x/g,'џ');
    unesenText = unesenText.replace(/X/g,'Џ');

    unesenText = unesenText.replace(/лј/g,'љ');
    unesenText = unesenText.replace(/ЛЈ/g,'Љ');
    unesenText = unesenText.replace(/Лј/g,'Љ');
    unesenText = unesenText.replace(/нј/g,'њ');
    unesenText = unesenText.replace(/НЈ/g,'Њ');
    unesenText = unesenText.replace(/Нј/g,'Њ');
    unesenText = unesenText.replace(/дж/g,'џ');
    unesenText = unesenText.replace(/Дž/g,'Џ');
    unesenText = unesenText.replace(/ДЖ/g,'џ');
    unesenText = unesenText.replace(/Дз/g,'Џ');
    unesenText = unesenText.replace(/ДЗ/g,'Џ');
    unesenText = unesenText.replace(/дз/g,'џ');
    unesenText = unesenText.replace(/Дј/g,'Ђ');
    unesenText = unesenText.replace(/ДЈ/g,'Ђ');
    unesenText = unesenText.replace(/дј/g,'ђ');

    // document.forms[0].cirText.value = unesenText;
    return unesenText;
}

export const extractNumericPart = (address: string) => {
    // Use a regular expression to match the numeric part
    const numericPart = address?.match(/\d+/);

    // Check if a numeric part is found
    if (numericPart) {
        // Convert the matched part to a number and return it
        return parseInt(numericPart[0], 10);
    } else {
        // If no numeric part is found, return null or handle it as needed
        return 0;
    }
}