'use client'

import { X } from 'lucide-react'
import { FC, useEffect, useRef, useState } from 'react'
import ReactStories from 'react-insta-stories'
import { cn } from '../../lib/utils'
import { Api } from '../../services/api-client'
import { IStory } from '../../services/stories'
import { Container } from './Container'

interface Props {
  className?: string
}

export const Stories: FC<Props> = ({ className }) => {
  const [stories, setStories] = useState<IStory[]>([])
  const [open, setOpen] = useState(false)
  const [selectedStory, setSelectedStory] = useState<IStory>()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll()
      setStories(data)
    }

    fetchStories()
  }, [])

  // закрытие модалки на клик вне ёё
  useEffect(() => {
    if (open) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
        ) {
          setOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [open])

  const onClickStory = (story: IStory) => {
    setSelectedStory(story)

    if (story.items.length > 0) {
      setOpen(true)
    }
  }

  return (
    <>
      <Container
        className={cn(
          'flex items-center justify-between gap-2 my-10',
          className
        )}
      >
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className='w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse'
            />
          ))}

        {stories.map(story => (
          <img
            alt='stories'
            key={story.id}
            onClick={() => onClickStory(story)}
            className='rounded-md cursor-pointer'
            height={250}
            width={200}
            src={story.previewImageUrl}
          />
        ))}

        {open && (
          <div
            className='absolute left-0 top-0 w-full h-full
           bg-black/80 flex items-center justify-center z-30'
          >
            <div
              ref={modalRef}
              className='relative rounded-md'
              style={{ width: 520 }}
            >
              <button
                className='absolute -right-10 -top-5 z-30'
                onClick={() => setOpen(false)}
              >
                <X
                  className='absolute top-0 right-0 w-8 h-8
                 text-white/50'
                />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={
                  selectedStory?.items.map(item => ({ url: item.sourceUrl })) ||
                  []
                }
                defaultInterval={3000}
                width={520}
                height={690}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  )
}
