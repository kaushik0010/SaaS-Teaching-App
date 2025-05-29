'use client'

import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { subjects } from '@/constants';

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('subject') || '';

    const [subjectQuery, setSubjectQuery] = useState('');

    useEffect(() => {
        let newUrl = '';
        if(subjectQuery === 'all') {
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["subject"],
            });
            router.push(newUrl, {scroll: false});
        } else {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'subject',
                value: subjectQuery
            });
            router.push(newUrl, { scroll: false });
        }

    }, [subjectQuery])

  return (
    <Select onValueChange={setSubjectQuery} value={subjectQuery}>
        <SelectTrigger className='input capitalize'>
            <SelectValue placeholder="subject" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value='all'>All subjects</SelectItem>
            {subjects.map((subject) => (
                <SelectItem key={subject} value={subject} className='capitalize'>
                    {subject}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

export default SubjectFilter