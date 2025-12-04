import React, { useState } from 'react';
import {
    FaGraduationCap,
    FaFlask,
    FaQuoteLeft,
    FaEnvelope,
    FaBook,
    FaGoogle, // Menambahkan ikon Google untuk Scholar
} from 'react-icons/fa';

// Data Dosen
const lecturers = [
    {
        id: 1,
        name: 'Dr. Hermawan Syahputra, M.Si.',
        role: 'Lektor (III/c)',
        avatar: 'https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=GK5EHLYAAAAJ&citpid=2',
        tags: ['Image Processing', 'Pattern Recognition', 'Computer Vision'],
        education: [
            'S3 Ilmu Komputer – UGM',
            'S2 Ilmu Komputer – IPB',
            'S1 Matematika – USU'
        ],
        research: ['Image Processing', 'Pattern Recognition', 'Computer Vision'],
        bio: 'Dr. Hermawan Syahputra, M.Si. merupakan dosen dengan jabatan Lektor yang memiliki fokus keahlian mendalam di bidang Image Processing dan Computer Vision.',
        contacts: [
            { type: 'email', href: 'mailto:hermawan@unimed.ac.id', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=GK5EHLYAAAAJ&hl=en&oi=ao', icon: <FaGoogle /> }, // Link Scholar
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6011957', icon: <FaBook /> },     // Link Sinta
        ],
    },
    {
        id: 2,
        name: 'Said Iskandar Al Idrus, S.Si., M.Si.',
        role: 'Lektor (III/c)',
        avatar: 'https://web-prodi-sepia.vercel.app/said.jpg',
        tags: ['Computational Science'],
        education: [
            'S2 Sains Komputasi – ITB',
            'S1 Matematika – USU'
        ],
        research: ['Computational Science'],
        bio: 'Said Iskandar Al Idrus, S.Si., M.Si. aktif sebagai Lektor dengan spesialisasi di bidang Computational Science.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=1VgpJpIAAAAJ&hl=en', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6016058', icon: <FaBook /> },
        ],
    },
    {
        id: 3,
        name: 'Zulfahmi Indra, S.Si., M.Cs.',
        role: 'Lektor (III/c)',
        avatar: 'https://web-prodi-sepia.vercel.app/zulfahmi.jpg',
        tags: ['Artificial Intelligence', 'Algoritma Genetika'],
        education: [
            'S2 Ilmu Komputer – UGM',
            'S1 Matematika – USU'
        ],
        research: ['Artificial Intelligence', 'Algoritma Genetika'],
        bio: 'Zulfahmi Indra, S.Si., M.Cs. memiliki keahlian khusus dalam Kecerdasan Buatan, khususnya pada penerapan Algoritma Genetika.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=c2BJ__cAAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6026820', icon: <FaBook /> },
        ],
    },
    {
        id: 4,
        name: 'Dr. Arnita, M.Si.',
        role: 'Lektor (III/d)',
        avatar: 'https://web-prodi-sepia.vercel.app/arnita.jpg',
        tags: ['Statistic', 'Data Mining'],
        education: [
            'S3 Matematika – USU',
            'S2 Statistika – IPB',
            'S1 Matematika – USU'
        ],
        research: ['Statistic', 'Data Mining'],
        bio: 'Dr. Arnita, M.Si. adalah ahli di bidang Statistik dan Data Mining dengan latar belakang pendidikan doktor dari USU.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=ih0EgWYAAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6101062', icon: <FaBook /> },
        ],
    },
    {
        id: 5,
        name: 'Yulita Molliq Rangkuti, S.Si., M.Sc., Ph.D.',
        role: 'Lektor Kepala (III/d)',
        avatar: 'https://web-prodi-sepia.vercel.app/yulita.jpg',
        tags: ['Mathematic Modelling'],
        education: [
            'S3 Matematika – Universiti Kebangsaan Malaysia',
            'S2 Matematika – Universiti Kebangsaan Malaysia',
            'S1 Matematika – USU'
        ],
        research: ['Mathematic Modelling'],
        bio: 'Yulita Molliq Rangkuti, Ph.D. menjabat sebagai Lektor Kepala dengan keahlian internasional di bidang Pemodelan Matematika.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=Q6qWe3kAAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6007066', icon: <FaBook /> },
        ],
    },
    {
        id: 6,
        name: 'Kana Saputra S, S.Pd., M.Kom.',
        role: 'Asisten Ahli (III/b)',
        avatar: 'https://web-prodi-sepia.vercel.app/kana.jpg',
        tags: ['Bioinformatic', 'Data Mining'],
        education: [
            'S2 Ilmu Komputer – IPB',
            'S1 Pendidikan Matematika – UNSYIAH'
        ],
        research: ['Bioinformatic', 'Data Mining'],
        bio: 'Kana Saputra S, S.Pd., M.Kom. berfokus pada riset Bioinformatika dan penggalian data (Data Mining).',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=IDcIUS4AAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/5980636', icon: <FaBook /> },
        ],
    },
    {
        id: 7,
        name: 'Insan Taufik, M.Kom.',
        role: 'Asisten Ahli (III/b)',
        avatar: 'https://web-prodi-sepia.vercel.app/insan.jpg',
        tags: ['Web Programming', 'Image Processing'],
        education: [
            'S2 Ilmu Komputer – UPI',
            'S1 Ilmu Komputer'
        ],
        research: ['Web Programming', 'Image Processing'],
        bio: 'Insan Taufik, M.Kom. memiliki spesialisasi dalam pengembangan Web Programming dan Pengolahan Citra Digital.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=5gvslm0AAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6732760', icon: <FaBook /> },
        ],
    },
    {
        id: 8,
        name: 'Debi Yandra Niska, M.Kom',
        role: 'Asisten Ahli (III/b)',
        avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISERATExIQExUSDxYSFhAXEhUQExEVFREXFxUSExUYHCggGBolGxUVITUhJSorLy4uFx8zODMtNygtLi0BCgoKDg0OGhAQGisiHyYwLS0tLS0tMC4tLTU3Ly0uKy0tLS0tLTUtLS0tLS0tNS0tLS0tLS0tLS0vLS0rLSstLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwIDBAUGAQj/xABJEAACAQIDBAYFBgsGBwEAAAAAAQIDEQQSIQUxQWEGE1FxkaEHIjJSgUJicrHB0RQVI3OCkpOywuHwM0RjorPDNDVTZIPS8ST/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIEBQMG/8QAKhEBAAIBAwMDAgcBAAAAAAAAAAECEQMEIRIxQQUiUTJhEzRxgZGxwSP/2gAMAwEAAhEDEQA/AJwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1HSTb2GwdJyxFTIpJqME31lTTVU1HW+u/S3agNuajb3SGlg456ykoe+pUteSi5qUnySZBe2OkcZyksKsdSi5X9bH16kmnr7Cllj3XkaZ08zcpU67b3zu5Sfe3HXxKzZ6xp5TbH0pbPe51/wBmv/Yon6RsJNrq61Sk/wDEw7qUn3qDzp8725MhqOChLdKpH6UH9e4rlgaiWjjLyZTren4UJlh6Q6cP7ajJx3uth5xxVNLtnB5atP4wtzZttndONnVrZMXRTlujUboSb7FGok2yAo1pw9pTjbja6R5UjCfGF+1PLfvjLeTF5ROlHh9PQkmk0009zTun3M9PmTZ+0MVgpZqFarS1v6r9SX0oP1ZfFMlnoJ6Rli31GIjGFfK3Bx0jiLK7jFP2alk/VvZ8OxXicvK1JhIQKaVRSjGUWmpJSTWqaaumiolQAAAAAAAAAAAAAAAAAAAAAAABaxMpKLyJSlb1U3ljfg5Pgu4+femG06VTEVUpvETvlqY2S9txf9nhKV8tKjF3s9ZPffjKb+lsKksJWjTl1eaLU63GlSs3VnH52RSS5yTPmdd1uW+3IrZ6aceWzp7SjHdB+KRX+NuyH+b+R7sXo9WxKbgoxinbPJtJviopJtm4qej7E2upU33qcf4WeE204nEy1RGpMZiGoePnwjFd7b+ooeLqdqXdH77mdU6N4ynp1SnbjGcX5Ss/IszwdRe1hcSucacpfUrEZr4Ti3nLH66b0zSfwX2IsVMFJ6qLXwsjMjhZ/JpYv9hMyKWwcVPdRkl2zlGnbvTd/InqiPJ0zPho4znDTd2xeqfej2nJqUZwbjKMlKNnrCSknGUXyaT5HTU+geIau50k3wWeXnZGm2rsathZR6xKzek4u8ZdsdbNO3BotXUrM4iVbad4jMxwmH0ZdIp4qlSpu35GnUdVpWjFzrtYenH9CM9OCUe07si/0L7QpWxNH1o1JS69J2yyjpGWW3FO178HG25koHtHZktGJAASqAAAAAAAAAAAAAAAAAAAAAMXamE66hWpXy9bRnTzWvlzwcb242ufNfSOnThi8TTpRy06NadCK42oy6vM3xbcHJvtbPp4+aOmuH6vH4+P/dVZ/tJuov3yJemmlHodhFTw1BW16iMn9KazS82zfmBsuGVKPZBLwSRnnJznl1ZjHDyUU96T71ctPCw92PgXgEZWlhoe7HwKlSj7sfBFYBmVKguxeBz/AEtwUZ4esrezDrI9qcFfT4Jr4nRGu2nDMqke2m14xf3jtMSmvKP/AEeVnDaWEtpmnOL5qVKf22fwJ4IH9HdFz2jhOUpTf6NKb+uxPB09Ps5u4+qAAHo8AAAAAAAAAAAAAAAAAAAAAAIN9J2zLbZikv8AilQn4vqn5U7k4t21fDiRR6UsdThjdn4iPrxpwqJuzUW1KLjFyto/Wk13MpeePu9NKOc+GbtvpFTwUM805ym7QpJ5XK3tNvhFXWvNGjoek+D9rDTS+bVjPycUV7N2bWx6WM6ynSUs1OnFU4TlCFOpKPtzjKzcszbSV7/BYW1dmq0oueKxLjPq5ZFQyxm4uWR1JxjHNli3lTbSs2ldGKlKx7ZjMt+peZ92cQ32F9IeBkrydak+yVJy/wBPMdFs3H069ONWlLNCW52cXo+KeqIp2FsnCYtPJ+FQtZXmoKLcr5UpxTV200r2u1YzKXSStsxzwyp05xjLOpTzKVpRVk7O2m4m2nE8V7oi84zOMJE25tinhKXW1FNrMo5YpOTbfC7S57zl6/pJor2KFaX05Qp/uuRqPx7W2mpUpxpU6cEpylFOU281oqLk3bj4Gu2nsqjhm2/wuWRRlKUI08tPPNwjdySV80ZKyvZqzsxWkROJ7pm046onh0NL0iVJ3yYJyS92tKVu+1I32x9uU8XFzinGUXlnSe+Euzmnwf1O6OZ2HSnXUFDGYyk5qTpwqyS6xRbUslouLaa1jfMt7VtS7tVYnZ04YipUp4iNWXUSvFU5r1XOLc4x19l70+K4lb0ifbEYlat8e7OYbP0T7N//AGYubWlCDpL6U6j3fCm/1iViPfRttCMaWIqzjKP4TipVIu111eVWfa1mc9ba7yQkzbpWiYx5YNeJ6s448AAPR4gAAAAAAAAAAAAAAAAAAAADC23JrD1muEGR1jMNmp0lJ50505tSeb1lJO6vfR3atz0sSdiKWeEov5UWvFEd4/CShFRV/wAno096UX9ljn7yJi0WdPYzE0tVV0Khlw0qf/TxWIhbdZOvOUV+rNGftDZNOphXhVGEaV80YqKWSTbba7U3KV73vme40uHw2KpVKs8M6UoVZKc6NRS0moxi5wnF6XUY3VnuMp7Q2iv7nhpc/wAJqR8upZTqnOYlM0ieJhldG9hwwlKpTShJVbKV43Tir2iovRayeuu80GzsHCvjcZiJJSSq9RT7EqMFCcl3yT8GbOeM2lNOMcLhqTasqrxM6uS/ysnVRvbsuXdkYGNGCpwbaprJme+b+VN827v4ldS845l6aOnHVmIaX8Dhh9o0JqKUMTejJbkqiWenLvbjY3XSXo5DGKlmcYulHJF5E1kWqi1yu7NW3u9y1trZ/XxyKWWek6c9+SpB5oS8Yoq/GO0Vo8Dh385YuaT5pdQ7d12Tp3nHEmtSOrmGzw+zaccPRoOEZwoz6yLks0usu31l+DvJ2taxp+mNNTls+m0mnjs7T1TVPD1W7r4ovwx2Pf8AdcPH/wA9Wp/tRMaVCvOrGriJU70YzVOlTg4Ri5pZpScpScpWVuCs3oWm05zMvOKeIhXNrqqk813BScUrpQa1Stxb08bEi4L+zp/m4/uo4TZmzHPLTfy6ilK3YmnbyJASL7KJ5lX1C0e2sPQAb3NAAAAAAAAAAAAAAAAAAAAAA1G2tj9beULKTVmnopaWv3m3BS9IvGJX09S1J6quB2bUtKPNG3NPiI5KtRe7VmvhndvKxtOs9XNyucvtw6s88qqjsnrbTecq8XUovWnLK+KeZPyN3Opfe1pzSt9xb66i/VdWnfs3x8dxW0Zeunaa+MtVRxNWrOMlBpKS9Zu1td9vsOqjJPVGqlXor1VVhdcL2j8HuLlKo1qn9qYrGEalpt4w2RpcReWa2+Tslzk7JeZssXVtD6Wn3mFs6OavRX+LF/qvN/CWxmYhTPTWZdNsTZXUpylZzatyiuxG1AOrSkUjEOTe9r26rAALKAAAAAAAAAAAAAAAAAAAAAAAAOU6T7PcJustYztm+bJJK/c0l8e8wMNX9Rx8PE7HaS/I1vzU/wB1kaUMQ08r0fDny7znbmkVtmPLpbW03pifDopYKlUis0ISdrZsqcl8TXV9iU091PXtpr7EZGFxDtdPvRdqVm99vA8JiJaK3tXtLCobEpt7qdl2QX2o2EsLTpwahCMbtXskm7cW+JTGu0rK3gY+KraaveMRBa9rd1OJr5rdiVvvNv0X2e3NVn7MU1D50no5dyV18eRylau5PJDfxl7v8yTMDG1KkuynFeEUaNtSLWzPhn3VppSI+V8AHQc0AAAAAAAAAAAAAAAAAAAAAAAAAAGPtJ/ka35qf7rI5x+Fzq63r+vEknERusu/No1y43OXxGysjlF7m7wlyMW7rM4lv2WpFcw5HC7QcXaTaa+Vvv3myp7ST4xf6VjG2ts13bS17O3mjSSjbRmLLpfh1tzDpJ7TiuMf1r+SNdWxkqsssL66Zt3h2GBQw8pOyR1OxtlqHrPfwJzlE1rTld2VsxU4pvfv/mzuKHsx+ivqNJgcI6j10it77eSN1R09V8N3cbtrWY5cvd6nVMQuAA1sYAAAAAAAAAAAAAAAAAAAAAAFMppbwKi1iKyjGT32Tdu2yLc67e7T6y0ys2+FohkYaea77UiqvRU1Z/zXNGJseV6aXGKyvvi3H7DPEcxyjtPDm9oYBrSSuuEl/Wj5GkxWzL/JUuaWv3nfSimrNXXYch0w23hcDlUs8qk1dUIWby+9Jv2V9fBaMx6u2xzDfobmZnpxyxcFs5R3qy7OL72b/BbPc7N6R833GJ0S2vhMZHNSbc4+1RnZTp88q0a+cr+Oh0xbS28d5V19zbOI4UwgkkkrJcDGx9XInJa5YuVu2yvYyzA2tLSEeM5xj8G7y8kzVbiGKOZZdOqnyfYXDCK4VWhFkzVlAohVTKyyoAAAAAAAAAAAAAAC4AplNLeeSu92nM8VFcde8gW5Vm9yPFRk9/mZKQIx8pysLD8ytUUXATiDLWYH1K9anwk1Uj3SVn5rzNmavafqVaFX53Vy7pbr/Gx7tXafV2hD1qkty35ebKxMVzlOMrPSXbEqFKfVKM62RuEHuvwcvu48t6hmU5TlOpOUp1KjzTqS3yf2JbkuC0Je/FTjByn605au+vemRHjYqnOpB39Sbjeza0dr3M2tNp7ur6ZNYm3z8qFUdOSqwnKnOn60asXllG3PiuT0ZMnRja1SrSpRxCUK7pqUklZSur6Lg+1dtyKujOHjiMRTgrOMX1k1u9WDTtrvvLKrdjZLNfZWeCabU1qnz5MnR6oV9SvSbREfy3Bq8R6+JhHhTg5PvlovK55szaTb6qrpUWie5T/mVbJWadar71RxXdHRfUz3mYthzMYZ3ULtZ51C7WXgXxCMrDw/MLMuZfAwZURqp8uRWeSinvKMjW5/BhC4CjrODuiskAAAAAAAADHpSvK5eqPR9xYw+/4FZ7phkgFM52TfL/4WQqB4kegAABi7Tw/WUpxW+113rcWNl7MVP1petUlq5PXU2IK9MZynPGFrELRd5BW0ZZ6lZ8J1Jv4Sk39pOW0KmWnOXuxcvBXIGjuRm3PeHX9Kr9U/oz/RvO2PhH36c4+Cz/wE4Ulou4gTonUybSwz7cRk/aJw/jJ9PXR7Me9jGowdpbNjVV90lukt5ewGH6unCPYteb4mQD16YzlkyAAlAAAAKaUrpeHxWjKmwLGJW4uUndIpxO5d55hno+8r5T4XgAWQAAAAALdd6fEt4be+4yGiiFNJ6EY5Tnh5GWj5Nr7vKxTN6QXbJeWv2FFZWz/Ohf4x3+VvAQ1cO6T8l95CGSACwAAAAANV0qq5cFin/gTXxasvrIUJe9IFTLgK/wA504+NWN/JMiExbn6od30uP+cz92LQqZMXRn7lelP9WcX9h9FHzZtRO7tvyad+p9HYWrnhCfvQjLxSZ7aE8MfqMYv/ACugA93OAAAAAFqi9ZrslfxV/vGIeiXvSUfhx8kym9pzfzE/C5TRu3Fv5ML/AKUv5LzIF3EbviUYZby81c9GOU54AASgAAAAAAABTKN/65W+0sYVaR5Jx/zL7jJPIxtfm7+JA9ABIAAAAAOR9J1W2DgvfxEY+EJy/hItJF9KtX8nhodtSc/1YpfxkdGDXn3vovToxoR+7X7SXrL6P2snronWz4HBS7cLSv3qmk/NEDbS3x7mTV6OK2bZuFfYpw/VqzivJI9tuxeoxzn7ulABpcoAAAAAY2Ljvt8pKHjIyIxt/XKwcb25O56AAAAAAAAAAAAAAAAAAAAAAAABH/pW34Purf7ZwIBz9f65fR7D8vX9/wC5YG0t8e5kv+iv/ltL87V/1ZAHtoMfqPaf1/x1wANTkAAAAAAAAAAAAAAAAP/Z',
        tags: ['Decision Support System'],
        education: [
            'S2 Ilmu Komputer – UPI',
            'S1 Ilmu Komputer – UPI'
        ],
        research: ['Decision Support System'],
        bio: 'Debi Yandra Niska, M.Kom berfokus pada pengembangan Sistem Pendukung Keputusan (Decision Support System).',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=fm-UV-0AAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6162023', icon: <FaBook /> },
        ],
    },
    {
        id: 9,
        name: 'Dr. Eng. Mansur As',
        role: 'Lektor (III/c)',
        avatar: 'https://web-prodi-sepia.vercel.app/mansur.jpg',
        tags: ['Data Mining', 'Artificial Intelligence'],
        education: [
            'S3 Dept. of Advanced IT – Kyushu University, Jepang',
            'S2 Teknik Informatika – UNHAS & Kyushu University',
            'S1 Teknik Informatika – STMIK Handayani Makassar'
        ],
        research: ['Data Mining', 'Artificial Intelligence'],
        bio: 'Dr. Eng. Mansur As adalah lulusan Kyushu University Jepang yang ahli dalam bidang Data Mining dan Kecerdasan Buatan.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=1jPsRKAAAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6774720', icon: <FaBook /> },
        ],
    },
    {
        id: 10,
        name: 'Putri Harliana, S.T., M.Kom',
        role: 'Lektor (III/d)',
        avatar: 'https://web-prodi-sepia.vercel.app/putri.jpg',
        tags: ['Artificial Intelligence'],
        education: [
            'S2 Universitas Sumatera Utara',
            'S1 Sekolah Tinggi Teknik Harapan'
        ],
        research: ['Artificial Intelligence'],
        bio: 'Putri Harliana, S.T., M.Kom menjabat sebagai Lektor dengan fokus riset utama pada bidang Artificial Intelligence.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=CG7og2UAAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6002359', icon: <FaBook /> },
        ],
    },
    {
        id: 11,
        name: 'Fanny Ramadhani, S.Kom., M.Kom',
        role: 'Asisten Ahli (III/b)',
        avatar: 'https://web-prodi-sepia.vercel.app/fanny.jpg',
        tags: ['Computer Science', 'Data Science'],
        education: [
            'S2 Teknik Informatika – USU',
            'S1 Teknik Informatika – USU'
        ],
        research: ['Computer Science', 'Data Science'],
        bio: 'Fanny Ramadhani, S.Kom., M.Kom aktif meneliti di bidang Computer Science dan Data Science.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?hl=en&view_op=list_works&authuser=4&gmla=AJsN-F7BQzVynZA5WvF2t3RQpONZoiwkZJaF6JjkbTZu3AfEZq4DbN323OLnLvTMf9X5zW_DCe24tzz96YkKSLyK9QkXllsL-Q&user=xv03R9cAAAAJ', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6752703', icon: <FaBook /> },
        ],
    },
    {
        id: 12,
        name: 'Adidtya Perdana, S.T., M.Kom',
        role: 'Lektor (III/c)',
        avatar: 'https://web-prodi-sepia.vercel.app/adidtya.jpg',
        tags: ['Artificial Intelligence'],
        education: [
            'S2 Teknik Informatika – USU',
            'S1 Teknik Informatika – Sekolah Tinggi Teknik Harapan'
        ],
        research: ['Artificial Intelligence'],
        bio: 'Adidtya Perdana, S.T., M.Kom memiliki keahlian dalam bidang Kecerdasan Buatan dan menjabat sebagai Lektor.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=kQKIiT0AAAAJ&hl=id&authuser=1', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/5979680', icon: <FaBook /> },
        ],
    },
    {
        id: 13,
        name: 'Sri Dewi, S.Kom., M.Kom',
        role: 'Asisten Ahli (III/b)',
        avatar: 'https://web-prodi-sepia.vercel.app/dewi.jpg',
        tags: ['Data Mining'],
        education: [
            'S2 Sistem Informasi – Universitas Putra Indonesia YPTK Padang',
            'S1 Sistem Informasi – Universitas Putra Indonesia YPTK Padang'
        ],
        research: ['Data Mining'],
        bio: 'Sri Dewi, S.Kom., M.Kom merupakan dosen yang fokus pada bidang Data Mining.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=XwHiyxgAAAAJ&hl=en', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6835736', icon: <FaBook /> },
        ],
    },
    {
        id: 14,
        name: 'Dedy Kiswanto S.Kom., M.Kom',
        role: 'Asisten Ahli (III/b)',
        avatar: 'https://web-prodi-sepia.vercel.app/dedi.jpg',
        tags: ['Network Infrastructure', 'Cyber Security'],
        education: [
            'S2 Ilmu Komputer – IPB',
            'S1 Ilmu Komputer – IPB'
        ],
        research: ['Network Infrastructure', 'Cyber Security'],
        bio: 'Dedy Kiswanto S.Kom., M.Kom memiliki spesialisasi teknis dalam Infrastruktur Jaringan dan Keamanan Siber (Cyber Security).',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.com/citations?user=_SKa-k0AAAAJ&hl=en&oi=ao', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6828715', icon: <FaBook /> },
        ],
    },
    {
        id: 15,
        name: 'Ichwanul Muslim Karo Karo, S.Kom, M.Kom',
        role: 'Asisten Ahli (III/b)',
        avatar: 'https://web-prodi-sepia.vercel.app/iwan.jpg',
        tags: ['Data Mining', 'Spatial Mining', 'Data Science'],
        education: [
            'S2 Informatika – Universitas Telkom',
            'S1 Ilmu Komputasi – Universitas Telkom'
        ],
        research: ['Data Mining', 'Spatial Mining', 'Data Science'],
        bio: 'Ichwanul Muslim Karo Karo, S.Kom, M.Kom memiliki keahlian luas dalam Data Science, termasuk Spatial Mining.',
        contacts: [
            { type: 'email', href: '#', icon: <FaEnvelope /> },
            { type: 'scholar', href: 'https://scholar.google.co.id/citations?user=LPPLLhMAAAAJ&hl=id', icon: <FaGoogle /> },
            { type: 'sinta', href: 'https://sinta.kemdikbud.go.id/authors/profile/6731973', icon: <FaBook /> },
        ],
    },
];

const DosenProfile = () => {
    const [selected, setSelected] = useState(null);

    return (
        <div className="glass-page lecturer-page">
            <div className="glass-video-bg-wrapper">
                <video autoPlay loop muted playsInline className="glass-video-bg">
                    <source src="/videos/background.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="glass-background-grid"></div>
            <div className="lecturer-orb orb-left" aria-hidden></div>
            <div className="lecturer-orb orb-right" aria-hidden></div>

            <div className="glass-header">
                <div className="glass-header-left">
                    <img
                        src="/Lambang_Universitas_Negeri_Medan.png"
                        alt="Lambang Universitas Negeri Medan"
                        className="glass-header-logo"
                    />
                    <div className="glass-header-text">
                        Ilmu<br />Komputer
                    </div>
                </div>

                <h1 className="glass-title">Profil Dosen</h1>

                <div className="glass-header-dots" aria-hidden>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className="lecturer-grid">
                {lecturers.map((lecturer) => (
                    <article key={lecturer.id} className="glass-panel lecturer-card">
                        <img src={lecturer.avatar} alt={lecturer.name} className="lecturer-avatar" />
                        <h3>{lecturer.name}</h3>
                        <p>{lecturer.role}</p>

                        <div className="lecturer-tags">
                            {lecturer.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="lecturer-tag">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <button className="lecturer-btn" onClick={() => setSelected(lecturer)}>
                            Lihat Detail
                        </button>
                    </article>
                ))}
            </div>

            <button
                className="glass-back-bottom"
                onClick={() => {
                    if (typeof window !== "undefined") {
                        try {
                            if (window.history && window.history.length > 1) {
                                window.history.back();
                                return;
                            }
                        } catch (e) { }
                        window.location.hash = "#/home";
                    }
                }}
                aria-label="Kembali"
            >
                Kembali
            </button>

            {selected && (
                <div
                    className="lecturer-modal-overlay"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setSelected(null)}
                >
                    <div className="glass-panel lecturer-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="lecturer-modal__close" onClick={() => setSelected(null)} aria-label="Tutup detail">
                            ×
                        </button>

                        <div className="lecturer-modal__header">
                            <img src={selected.avatar} alt={selected.name} />
                            <div className="lecturer-modal__title">
                                <h2>{selected.name}</h2>
                                <p>{selected.role}</p>
                            </div>
                        </div>

                        <hr style={{ borderColor: 'rgba(255,255,255,0.08)' }} />

                        <div className="lecturer-modal__sections">
                            <div className="lecturer-modal__section">
                                <h4><FaGraduationCap /> Pendidikan</h4>
                                <ul>
                                    {selected.education.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="lecturer-modal__section">
                                <h4><FaFlask /> Minat Penelitian</h4>
                                <ul>
                                    {selected.research.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="lecturer-modal__section lecturer-modal__bio">
                            <h4><FaQuoteLeft /> Biografi Singkat</h4>
                            <p>{selected.bio}</p>
                        </div>

                        {/* --- BAGIAN TOMBOL PUBLIKASI & SINTA --- */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '25px' }}>

                            {/* 1. Tombol Google Scholar (Biru) */}
                            {selected.contacts
                                .filter((c) => c.type === 'scholar')
                                .map((contact, index) => (
                                    <a
                                        key={index}
                                        href={contact.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="lecturer-btn"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            textDecoration: 'none',
                                            textAlign: 'center',
                                            backgroundColor: 'rgba(66, 133, 244, 0.2)', // Biru transparan
                                            border: '1px solid rgba(66, 133, 244, 0.5)',
                                            width: 'auto'
                                        }}
                                    >
                                        <FaGoogle /> Google Scholar
                                    </a>
                                ))}

                            {/* 2. Tombol Sinta (Orange/Kuning) */}
                            {selected.contacts
                                .filter((c) => c.type === 'sinta')
                                .map((contact, index) => (
                                    <a
                                        key={index}
                                        href={contact.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="lecturer-btn"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            textDecoration: 'none',
                                            textAlign: 'center',
                                            backgroundColor: 'rgba(255, 165, 0, 0.2)', // Orange transparan
                                            border: '1px solid rgba(255, 165, 0, 0.6)',
                                            color: '#ffb74d', // Text agak kuning/orange
                                            width: 'auto'
                                        }}
                                    >
                                        <FaBook /> Profil Sinta
                                    </a>
                                ))}
                        </div>

                        {/* --- KONTAK LAIN (Email, dll) --- */}
                        <div
                            className="lecturer-contact-links"
                            style={{ marginTop: '20px', justifyContent: 'center', display: 'flex', gap: '20px' }}
                        >
                            {selected.contacts
                                .filter((contact) => contact.type !== 'sinta' && contact.type !== 'scholar')
                                .map((contact, index) => (
                                    <a
                                        key={index}
                                        href={contact.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={contact.type}
                                        style={{ fontSize: '1.5rem', opacity: 0.8, transition: '0.3s' }}
                                    >
                                        {contact.icon}
                                    </a>
                                ))}
                        </div>
                        {/* End Contact Section */}

                    </div>
                </div>
            )}
        </div>
    );
};

export default DosenProfile;