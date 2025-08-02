import React from 'react';
import moment from 'moment';
import { RichText } from '@graphcms/rich-text-react-renderer';
import Image from 'next/image';
const PostDetail = ({ post }) => {

  return (
    <>
      <div className="text-gray-200 border border-teal-600 bg-teal-600/10 shadow-lg shadow-gray-700 rounded-lg lg:p-8 pb-12 mb-8">
      <div className=" shadow-md mb-6">
        <Image  unoptimized
         alt={post.title}
         width={800}
         height={500}
      
         src={post.featuredImage.url} className=" h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
   </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
         <div className='flex'> 
           {/*}  <Image unoptimized
                alt={post.author.name}
                width={45}
                height={45}
                className="align-middle rounded-full"
                src={post.author.photo.url}
              /> */}
              <p className="inline align-middle text-white ml-2 mt-2 font-medium text-lg">{post?.author?.name}</p>
              </div> 
            </div>
            <div className="font-medium text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="align-middle  text-white">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
            </div>
          </div>
          <h1 className="mb-8 text-3xl text-white font-semibold">{post.title}</h1>
          <RichText content={post.content.raw.children} 
                    renderers={{
                      h1: ({ children }) => <h1 className="text-4xl text-white font-bold py-4">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-3xl text-white font-bold py-4">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-2xl text-white font-bold py-4">{children}</h3>,
                      h4: ({ children }) => <h4 className="text-xl text-white font-bold py-4">{children}</h4>,
                      h5: ({ children }) => <h5 className="text-lg text-white font-bold py-4">{children}</h5>,
                      h6: ({ children }) => <h6 className="text-base text-white font-bold py-4">{children}</h6>,
                      p: ({ children }) => <p className="text-justify whitespace-pre-line ">{children}</p>,
                      a: ({ href, children }) => <a href={href} className="text-blue-700" target={'_blank'} rel="noreferrer">{children}</a>,
                      blockquote: ({ children }) => <blockquote className="text-justify">{children}</blockquote>,
                      ul: ({ children }) => <ul className="list-disc pl-4">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal pl-4">{children}</ol>,
                      li: ({ children }) => <li className="text-justify">{children}</li>,
                      table: ({ children }) => <table className='table-auto border border-collapse'>{children}</table>,
                      table_head: ({ children }) => <thead className='border bg-slate-500'>{children}</thead>,
                      table_body: ({ children }) => <tbody className='border'>{children}</tbody>,
                      table_row: ({ children }) => <tr className='border'>{children}</tr>,
                      table_cell: ({ children }) => <td className='border text-center px-2'>{children}</td>,
                      table_header_cell: ({ children }) => <th className='border text-white text-center text-lg px-2'>{children}</th>,
                    }}
          />
        </div>
      </div>

    </>
  );
};

export default PostDetail;
