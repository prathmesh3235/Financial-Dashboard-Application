import React from 'react';

// Transaction type icons
export const CardDepositIcon = () => (
  <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="27.5" cy="27.5" r="27.5" fill="#FFF5D9"/>
    <path d="M32.6452 37.6094H19.6798C18.9859 37.6087 18.3206 37.3327 17.8299 36.842C17.3392 36.3513 17.0632 35.686 17.0625 34.992V27.2543C17.0632 26.5604 17.3392 25.8951 17.8299 25.4044C18.3206 24.9137 18.9859 24.6377 19.6798 24.637H32.6452C33.3391 24.6377 34.0044 24.9137 34.4951 25.4044C34.9858 25.8951 35.2618 26.5604 35.2625 27.2543V34.992C35.2618 35.686 34.9858 36.3513 34.4951 36.842C34.0044 37.3327 33.3391 37.6087 32.6452 37.6094ZM19.6798 26.2776C19.4209 26.2779 19.1726 26.3809 18.9895 26.564C18.8064 26.7471 18.7034 26.9954 18.7031 27.2543V34.992C18.7034 35.251 18.8064 35.4993 18.9895 35.6824C19.1726 35.8655 19.4209 35.9685 19.6798 35.9688H32.6452C32.9041 35.9685 33.1524 35.8655 33.3355 35.6824C33.5186 35.4993 33.6216 35.251 33.6219 34.992V27.2543C33.6216 26.9954 33.5186 26.7471 33.3355 26.564C33.1524 26.3809 32.9041 26.2779 32.6452 26.2776H19.6798Z" fill="#FFBB38"/>
    <path d="M36.3212 33.1917H34.4422C34.2246 33.1917 34.016 33.1053 33.8621 32.9515C33.7083 32.7976 33.6219 32.589 33.6219 32.3714C33.6219 32.1538 33.7083 31.9452 33.8621 31.7914C34.016 31.6375 34.2246 31.5511 34.4422 31.5511H36.3212C36.58 31.5505 36.828 31.4474 37.0109 31.2643C37.1937 31.0812 37.2966 30.8331 37.2969 30.5744V22.8366C37.2967 22.5778 37.1939 22.3295 37.0111 22.1463C36.8282 21.9632 36.5801 21.86 36.3212 21.8594H23.3559C23.097 21.8597 22.8487 21.9627 22.6656 22.1458C22.4825 22.3289 22.3795 22.5771 22.3792 22.8361V25.4567C22.3792 25.6743 22.2928 25.8829 22.1389 26.0368C21.9851 26.1906 21.7765 26.277 21.5589 26.277C21.3413 26.277 21.1327 26.1906 20.9789 26.0368C20.825 25.8829 20.7386 25.6743 20.7386 25.4567V22.8366C20.7392 22.1426 21.0151 21.4772 21.5058 20.9863C21.9965 20.4955 22.6619 20.2195 23.3559 20.2188H36.3212C37.0151 20.2198 37.6802 20.496 38.1707 20.9867C38.6611 21.4775 38.9369 22.1428 38.9375 22.8366V30.5744C38.9368 31.2681 38.6609 31.9333 38.1705 32.4239C37.68 32.9146 37.015 33.1907 36.3212 33.1917Z" fill="#FFBB38"/>
    <path d="M34.4422 31.7463H17.8828C17.6653 31.7463 17.4566 31.6599 17.3028 31.506C17.1489 31.3522 17.0625 31.1436 17.0625 30.926V28.1708C17.0625 27.9533 17.1489 27.7446 17.3028 27.5908C17.4566 27.437 17.6653 27.3505 17.8828 27.3505H34.4422C34.6597 27.3505 34.8684 27.437 35.0222 27.5908C35.1761 27.7446 35.2625 27.9533 35.2625 28.1708V30.926C35.2625 31.1436 35.1761 31.3522 35.0222 31.506C34.8684 31.6599 34.6597 31.7463 34.4422 31.7463ZM18.7031 30.1057H33.6219V28.9911H18.7031V30.1057Z" fill="#FFBB38"/>
  </svg>
);

export const PaypalIcon = () => (
  <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="27.5" cy="27.5" r="27.5" fill="#E7EDFF"/>
    <path d="M36.995 22.3825C36.9812 20.8522 36.3641 19.3892 35.2779 18.3112C34.1917 17.2332 32.7241 16.6273 31.1937 16.625H22.75C22.5402 16.6223 22.3365 16.695 22.1759 16.8299C22.0153 16.9649 21.9085 17.153 21.875 17.36L18.8825 36.1288C18.8638 36.253 18.8721 36.3799 18.9068 36.5007C18.9415 36.6215 19.0019 36.7334 19.0837 36.8288C19.1651 36.9264 19.2667 37.0052 19.3815 37.0596C19.4963 37.114 19.6217 37.1427 19.7487 37.1438H23.3625L23.17 38.36C23.1495 38.4861 23.1569 38.6151 23.1917 38.738C23.2264 38.8609 23.2876 38.9747 23.371 39.0714C23.4543 39.1681 23.5579 39.2454 23.6743 39.2979C23.7908 39.3503 23.9173 39.3767 24.045 39.375H28.1137C28.3222 39.378 28.5249 39.3065 28.6853 39.1734C28.8457 39.0403 28.9533 38.8542 28.9887 38.6488L29.8637 33.3025H32.62C34.3451 33.2956 35.9974 32.606 37.2156 31.3845C38.4338 30.163 39.1189 28.5089 39.1212 26.7838V26.5388C39.1203 25.7273 38.9272 24.9275 38.5576 24.2051C38.188 23.4827 37.6525 22.8581 36.995 22.3825ZM23.4937 18.375H31.1937C32.1117 18.3778 33.0017 18.6917 33.7184 19.2654C34.4351 19.839 34.9362 20.6387 35.14 21.5338C34.7614 21.445 34.3738 21.4009 33.985 21.4025H26.6875C26.4777 21.3998 26.274 21.4725 26.1134 21.6074C25.9528 21.7424 25.846 21.9305 25.8125 22.1375L25.2962 25.375C25.2591 25.6071 25.3157 25.8444 25.4535 26.0347C25.5914 26.2251 25.7992 26.3529 26.0312 26.39C26.2633 26.4271 26.5006 26.3706 26.691 26.2327C26.8813 26.0949 27.0091 25.8871 27.0462 25.655L27.4487 23.135H34.0025C34.4219 23.1372 34.8373 23.2173 35.2275 23.3713C35.0611 24.741 34.4003 26.0029 33.3691 26.9197C32.3378 27.8365 31.0073 28.3451 29.6275 28.35H25.5675C25.359 28.347 25.1563 28.4185 24.9959 28.5516C24.8355 28.6848 24.7279 28.8708 24.6925 29.0763L23.625 35.3938H20.7725L23.4937 18.375ZM37.3712 26.7838C37.3689 28.0448 36.8682 29.2538 35.9781 30.1471C35.0881 31.0404 33.881 31.5456 32.62 31.5525H29.12C28.9115 31.5495 28.7088 31.621 28.5484 31.7541C28.388 31.8873 28.2804 32.0733 28.245 32.2788L27.37 37.625H25.06L25.2525 36.4088L26.3025 30.1175H29.61C31.2435 30.1127 32.8295 29.5677 34.121 28.5675C35.4124 27.5672 36.3368 26.1679 36.75 24.5875C37.1561 25.1569 37.3734 25.8394 37.3712 26.5388V26.7838Z" fill="#396AFF"/>
  </svg>
);

export const UserTransactionIcon = () => (
  <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="27.5" cy="27.5" r="27.5" fill="#DCFAF8"/>
    <path d="M28.0001 25.379C28.4962 25.379 28.9013 25.7831 28.9013 26.2792C28.9013 26.7319 29.2693 27.0988 29.7219 27.0988C30.1736 27.0988 30.5415 26.7319 30.5415 26.2792C30.5415 25.1671 29.817 24.2287 28.8197 23.8856V23.4205C28.8197 22.9688 28.4528 22.5999 28.0001 22.5999C27.5464 22.5999 27.1795 22.9688 27.1795 23.4205V23.8856C26.1822 24.2287 25.4597 25.1671 25.4597 26.2792C25.4597 27.6817 26.5987 28.8206 28.0001 28.8206C28.4962 28.8206 28.9013 29.2257 28.9013 29.7218C28.9013 30.2189 28.4962 30.6231 28.0001 30.6231C27.504 30.6231 27.0999 30.2189 27.0999 29.7218C27.0999 29.2691 26.732 28.9012 26.2793 28.9012C25.8256 28.9012 25.4597 29.2691 25.4597 29.7218C25.4597 30.8339 26.1822 31.7713 27.1795 32.1144V32.5795C27.1795 33.0332 27.5464 33.4011 28.0001 33.4011C28.4528 33.4011 28.8197 33.0332 28.8197 32.5795V32.1144C29.817 31.7713 30.5415 30.8339 30.5415 29.7218C30.5415 28.3204 29.4016 27.1804 28.0001 27.1804C27.504 27.1804 27.0999 26.7763 27.0999 26.2792C27.0999 25.7831 27.504 25.379 28.0001 25.379ZM34.872 32.5547C35.274 32.7666 35.769 32.6126 35.9799 32.2136C36.662 30.9248 37.0217 29.4676 37.0217 28C37.0217 23.0267 32.9734 18.9795 28.0001 18.9795C23.0258 18.9795 18.9786 23.0267 18.9786 28C18.9786 32.9743 23.0258 37.0215 28.0001 37.0215C29.446 37.0215 30.8826 36.6722 32.1548 36.0097C32.5569 35.802 32.7129 35.3049 32.5042 34.9039C32.2954 34.5039 31.8004 34.3447 31.3973 34.5545C30.3441 35.1044 29.2 35.3824 28.0001 35.3824C23.9301 35.3824 20.6177 32.071 20.6177 28C20.6177 23.931 23.9301 20.6186 28.0001 20.6186C32.0701 20.6186 35.3825 23.931 35.3825 28C35.3825 29.202 35.0869 30.3936 34.5309 31.4457C34.318 31.8467 34.471 32.3428 34.872 32.5547ZM28.0001 15.697C25.6241 15.697 23.3173 16.3771 21.3298 17.6617C20.9484 17.9077 20.8399 18.4152 21.0859 18.7955C21.3329 19.1758 21.8383 19.2833 22.2207 19.0394C23.9405 17.9273 25.9414 17.3382 28.0001 17.3382C33.8798 17.3382 38.6619 22.1214 38.6619 28C38.6619 33.8797 33.8798 38.6628 28.0001 38.6628C22.1204 38.6628 17.3373 33.8797 17.3373 28C17.3373 25.9609 17.9151 23.9775 19.0096 22.2671C19.2535 21.8847 19.1419 21.3772 18.7594 21.1333C18.3781 20.8894 17.8706 21.001 17.6278 21.3824C16.3648 23.3574 15.6971 25.6477 15.6971 28C15.6971 34.785 21.2151 40.303 28.0001 40.303C34.7841 40.303 40.3031 34.785 40.3031 28C40.3031 21.217 34.7841 15.697 28.0001 15.697Z" fill="#16DBCC"/>
  </svg>
);

const TransactionIcons = {
  CardDepositIcon,
  PaypalIcon,
  UserTransactionIcon
};

export default TransactionIcons; 