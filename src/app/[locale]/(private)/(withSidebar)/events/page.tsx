import { TabTitle, Tabs, TabsContent } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/navigation';
import { IoArrowRedo, IoChevronBack, IoChevronForward } from 'react-icons/io5';

export interface IEventProps {
  params: {
    locale: string;
  };
}

export default function Event({ params: { locale } }: IEventProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <div className='ms-60 mt-16 max-lg/2:ms-0'>
      <div className='newsfeed px-5 py-5'>
        <main className='max-lg:ms-0'>
          <div className=''>
            <div className='page-heading'>
              <h1 className='page-title'> {t('Events')} </h1>

              <Tabs id='events-tabs' disableChevron>
                <TabTitle>{t('Suggestions')}</TabTitle>
                <TabTitle>{t('Popular')}</TabTitle>
                <TabTitle>{t('My events')}</TabTitle>
              </Tabs>
            </div>

            <TabsContent id='events-tabs' className='!border-none'>
              <div>
                {/* <!-- event featured --> */}
                <div className='relative' data-uk-slider='finite:true'>
                  <div className='uk-slider-container pb-1'>
                    <ul className='uk-slider-items grid-small'>
                      <li className='lg:w-1/4 sm:w-1/3 w-1/2'>
                        <div className='card'>
                          <Link href='/events/123'>
                            <div className='card-media h-32'>
                              <Image width={500} height={500} src='/images/events/img-3.jpg' alt='' />
                              <div className='card-overlay'></div>
                            </div>
                          </Link>
                          <div className='card-body'>
                            <p className='text-xs font-medium text-blue-600 mb-1'> {t('Next week')} </p>
                            <Link href='/events/123'>
                              <h4 className='card-title text-sm'> About Safety and Flight </h4>
                            </Link>
                            <Link href=''>
                              <p className='card-text text-black mt-2'> Dubai </p>
                            </Link>
                            <div className='card-list-info text-xs mt-1'>
                              <div> 26 {t('Interested')}</div>
                              <div className='md:block hidden'>·</div>
                              <div> 8 {t('Going')}</div>
                            </div>
                            <div className='flex gap-2'>
                              <button
                                type='button'
                                className='button bg-blue-1 hover:bg-blue-2 duration-300 text-white flex-1'>
                                {t('Interested')}
                              </button>
                              <button
                                type='button'
                                className='button bg-foreground-2 hover:bg-hover-2 duration-300 !w-auto'>
                                <IoArrowRedo className='text-lg' />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className='lg:w-1/4 sm:w-1/3 w-1/2'>
                        <div className='card'>
                          <Link href='/events/123'>
                            <div className='card-media h-32'>
                              <Image width={500} height={500} src='/images/events/img-2.jpg' alt='' />
                              <div className='card-overlay'></div>
                            </div>
                          </Link>
                          <div className='card-body'>
                            <p className='text-xs font-semibold text-teal-600 mb-1'>{t('Opening')}</p>
                            <Link href='/events/123'>
                              <h4 className='card-title text-sm'> Wedding trend Ideas </h4>
                            </Link>
                            <Link href=''>
                              <p className='card-text text-black mt-2'> Turkey </p>
                            </Link>
                            <div className='card-list-info text-xs mt-1'>
                              <div> 20 {t('Interested')}</div>
                              <div className='md:block hidden'>·</div>
                              <div> 16 {t('Going')}</div>
                            </div>
                            <div className='flex gap-2'>
                              <button
                                type='button'
                                className='button bg-blue-1 hover:bg-blue-2 duration-300 text-white flex-1'>
                                {t('Interested')}
                              </button>
                              <button
                                type='button'
                                className='button bg-foreground-2 hover:bg-hover-2 duration-300 !w-auto'>
                                <IoArrowRedo className='text-lg' />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className='lg:w-1/4 sm:w-1/3 w-1/2'>
                        <div className='card'>
                          <Link href='/events/123'>
                            <div className='card-media h-32'>
                              <Image width={500} height={500} src='/images/events/img-1.jpg' alt='' />
                              <div className='card-overlay'></div>
                            </div>
                          </Link>
                          <div className='card-body'>
                            <p className='text-xs font-medium text-red-600 mb-1'> WED JUL 10,2024 AT 10PM </p>
                            <Link href='/events/123'>
                              <h4 className='card-title text-sm'> The global creative </h4>
                            </Link>
                            <Link href=''>
                              <p className='card-text text-black mt-2'> Japan </p>
                            </Link>
                            <div className='card-list-info text-xs mt-1'>
                              <div> 15 {t('Interested')}</div>
                              <div className='md:block hidden'>·</div>
                              <div> 2 {t('Going')}</div>
                            </div>
                            <div className='flex gap-2'>
                              <button
                                type='button'
                                className='button bg-blue-1 hover:bg-blue-2 duration-300 text-white flex-1'>
                                {t('Interested')}
                              </button>
                              <button
                                type='button'
                                className='button bg-foreground-2 hover:bg-hover-2 duration-300 !w-auto'>
                                <IoArrowRedo className='text-lg' />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className='lg:w-1/4 sm:w-1/3 w-1/2'>
                        <div className='card'>
                          <Link href='/events/123'>
                            <div className='card-media h-32'>
                              <Image width={500} height={500} src='/images/events/img-4.jpg' alt='' />
                              <div className='card-overlay'></div>
                            </div>
                          </Link>
                          <div className='card-body'>
                            <p className='text-xs font-semibold text-teal-600 mb-1'>{t('Opening')}</p>
                            <Link href='/events/123'>
                              <h4 className='card-title text-sm'> Perspective is everything </h4>
                            </Link>
                            <Link href=''>
                              <p className='card-text text-black mt-2'> London </p>
                            </Link>
                            <div className='card-list-info text-xs mt-1'>
                              <div> 20 {t('Interested')}</div>
                              <div className='md:block hidden'>·</div>
                              <div> 16 {t('Going')}</div>
                            </div>
                            <div className='flex gap-2'>
                              <button
                                type='button'
                                className='button bg-blue-1 hover:bg-blue-2 duration-300 text-white flex-1'>
                                {t('Interested')}
                              </button>
                              <button
                                type='button'
                                className='button bg-foreground-2 hover:bg-hover-2 duration-300 !w-auto'>
                                <IoArrowRedo className='text-lg' />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className='lg:w-1/4 sm:w-1/3 w-1/2'>
                        <div className='card'>
                          <Link href='/events/123'>
                            <div className='card-media h-32'>
                              <Image width={500} height={500} src='/images/events/img-3.jpg' alt='' />
                              <div className='card-overlay'></div>
                            </div>
                          </Link>
                          <div className='card-body'>
                            <p className='text-xs font-medium text-blue-600 mb-1'> {t('Next week')} </p>
                            <Link href='/events/123'>
                              <h4 className='card-title text-sm'> About Safety and Flight </h4>
                            </Link>
                            <Link href=''>
                              <p className='card-text text-black mt-2'> Dubai </p>
                            </Link>
                            <div className='card-list-info text-xs mt-1'>
                              <div> 26 {t('Interested')}</div>
                              <div className='md:block hidden'>·</div>
                              <div> 8 {t('Going')}</div>
                            </div>
                            <div className='flex gap-2'>
                              <button
                                type='button'
                                className='button bg-blue-1 hover:bg-blue-2 duration-300 text-white flex-1'>
                                {t('Interested')}
                              </button>
                              <button
                                type='button'
                                className='button bg-foreground-2 hover:bg-hover-2 duration-300 !w-auto'>
                                <IoArrowRedo className='text-lg' />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* <!-- slide nav icons --> */}
                  <Link className='nav-prev !top-20' href='' data-uk-slider-item='previous'>
                    <IoChevronBack className='text-2xl' />
                  </Link>
                  <Link className='nav-next !top-20' href='' data-uk-slider-item='next'>
                    <IoChevronForward className='text-2xl' />
                  </Link>
                </div>

                <div className='sm:my-6 my-3 flex items-center justify-between md:mt-10'>
                  <div>
                    <h2 className='text-xl font-semibold'> {t('Lists You May Like')} </h2>
                    <p className='font-normal text-sm text-gray-500 leading-6'>
                      {t('Find a group by browsing top categories')}.
                    </p>
                  </div>
                  <Link href='' className='text-blue-500 sm:block hidden text-sm'>
                    {t('See all')}
                  </Link>
                </div>

                {/* <!-- listing  slider --> */}
                <div className='relative mt-4' data-uk-slider='finite:true'>
                  <div className='uk-slider-container pb-1'>
                    <ul className='uk-slider-items grid-small'>
                      <li className='md:w-1/5 sm:w-1/3 w-1/2'>
                        <Link href=''>
                          <div className='relative rounded-lg overflow-hidden'>
                            <Image
                              width={500}
                              height={500}
                              src='/images/events/listing-1.jpg'
                              alt=''
                              className='h-36 w-full object-cover'
                            />
                            <div className='w-full bottom-0 absolute left-0 bg-gradient-to-t from-black/60 pt-10'>
                              <div className='text-white p-5'>
                                <div className='text-sm font-light'> Miami </div>
                                <div className='text-lg leading-3 mt-1.5'> {t('Hotels')} </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li className='md:w-1/5 sm:w-1/3 w-1/2'>
                        <Link href=''>
                          <div className='relative rounded-lg overflow-hidden'>
                            <Image
                              width={500}
                              height={500}
                              src='/images/events/listing-2.jpg'
                              alt=''
                              className='h-36 w-full object-cover'
                            />
                            <div className='w-full bottom-0 absolute left-0 bg-gradient-to-t from-black/60 pt-10'>
                              <div className='text-white p-5'>
                                <div className='text-sm font-light'> Florida </div>
                                <div className='text-lg leading-3 mt-1.5'> {t('Hotels')} </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li className='md:w-1/5 sm:w-1/3 w-1/2'>
                        <Link href=''>
                          <div className='relative rounded-lg overflow-hidden'>
                            <Image
                              width={500}
                              height={500}
                              src='/images/events/listing-3.jpg'
                              alt=''
                              className='h-36 w-full object-cover'
                            />
                            <div className='w-full bottom-0 absolute left-0 bg-gradient-to-t from-black/60 pt-10'>
                              <div className='text-white p-5'>
                                <div className='text-sm font-light'> London </div>
                                <div className='text-lg leading-3 mt-1.5'> {t('Hotels')} </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li className='md:w-1/5 sm:w-1/3 w-1/2'>
                        <Link href=''>
                          <div className='relative rounded-lg overflow-hidden'>
                            <Image
                              width={500}
                              height={500}
                              src='/images/events/listing-4.jpg'
                              alt=''
                              className='h-36 w-full object-cover'
                            />
                            <div className='w-full bottom-0 absolute left-0 bg-gradient-to-t from-black/60 pt-10'>
                              <div className='text-white p-5'>
                                <div className='text-sm font-light'> Dubai </div>
                                <div className='text-lg leading-3 mt-1.5'> {t('Hotels')} </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li className='md:w-1/5 sm:w-1/3 w-1/2'>
                        <Link href=''>
                          <div className='relative rounded-lg overflow-hidden'>
                            <Image
                              width={500}
                              height={500}
                              src='/images/events/listing-5.jpg'
                              alt=''
                              className='h-36 w-full object-cover'
                            />
                            <div className='w-full bottom-0 absolute left-0 bg-gradient-to-t from-black/60 pt-10'>
                              <div className='text-white p-5'>
                                <div className='text-sm font-light'> Turkey </div>
                                <div className='text-lg leading-3 mt-1.5'> {t('Restaurant')} </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li className='md:w-1/5 sm:w-1/3 w-1/2'>
                        <Link href=''>
                          <div className='relative rounded-lg overflow-hidden'>
                            <Image
                              width={500}
                              height={500}
                              src='/images/events/listing-1.jpg'
                              alt=''
                              className='h-36 w-full object-cover'
                            />
                            <div className='w-full bottom-0 absolute left-0 bg-gradient-to-t from-black/60 pt-10'>
                              <div className='text-white p-5'>
                                <div className='text-sm font-light'> Miami </div>
                                <div className='text-lg leading-3 mt-1.5'> {t('Hotels')} </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* <!-- slide nav icons --> */}
                  <Link className='nav-prev' href='' data-uk-slider-item='previous'>
                    <IoChevronBack className='text-2xl' />
                  </Link>
                  <Link className='nav-next' href='' data-uk-slider-item='next'>
                    <IoChevronForward className='text-2xl' />
                  </Link>
                </div>

                <div className='flex items-center justify-between text-black dark:text-white py-3 mt-6'>
                  <h3 className='text-xl font-semibold'> {t('Upcoming Events')} </h3>
                  <Link href='' className='text-sm text-blue-500'>
                    {t('See all')}
                  </Link>
                </div>

                {/* <!-- event grid --> */}
                <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2.5 mt-4'>
                  <div className='card'>
                    <Link href='/events/123'>
                      <div className='card-media h-32'>
                        <Image width={500} height={500} src='/images/events/img-1.jpg' alt='' />
                        <div className='card-overlay'></div>
                      </div>
                    </Link>
                    <div className='card-body'>
                      <p className='text-xs font-medium text-black dark:text-red-600 mb-1'>
                        WED JUL 10,2024 AT 10PM
                      </p>
                      <Link href='/events/123'>
                        <h4 className='card-title text-sm'> The global creative </h4>
                      </Link>
                      <Link href=''>
                        <p className='card-text text-black mt-2'> Japan </p>
                      </Link>
                      <div className='card-list-info text-xs mt-1'>
                        <div> 15 {t('Interested')}</div>
                        <div className='md:block hidden'>·</div>
                        <div> 2 {t('Going')}</div>
                      </div>
                      <div className='flex gap-2'>
                        <button
                          type='button'
                          className='button bg-blue-1 hover:bg-blue-2 duration-300 text-white flex-1'>
                          {t('Interested')}
                        </button>
                        <button
                          type='button'
                          className='button bg-foreground-2 hover:bg-hover-2 duration-300 !w-auto'>
                          <IoArrowRedo className='text-lg' />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className='card'>
                    <Link href='/events/123'>
                      <div className='card-media h-32'>
                        <Image width={500} height={500} src='/images/events/img-2.jpg' alt='' />
                        <div className='card-overlay'></div>
                      </div>
                    </Link>
                    <div className='card-body'>
                      <p className='text-xs font-semibold text-teal-600 mb-1'>{t('Opening')}</p>
                      <Link href='/events/123'>
                        <h4 className='card-title text-sm'> Wedding trend Ideas </h4>
                      </Link>
                      <Link href=''>
                        <p className='card-text text-black mt-2'> Turkey </p>
                      </Link>
                      <div className='card-list-info text-xs mt-1'>
                        <div> 20 {t('Interested')}</div>
                        <div className='md:block hidden'>·</div>
                        <div> 16 {t('Going')}</div>
                      </div>
                      <div className='flex gap-2'>
                        <button
                          type='button'
                          className='button bg-blue-1 hover:bg-blue-2 duration-300 text-white flex-1'>
                          {t('Interested')}
                        </button>
                        <button
                          type='button'
                          className='button bg-foreground-2 hover:bg-hover-2 duration-300 !w-auto'>
                          <IoArrowRedo className='text-lg' />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className='card'>
                    <Link href='/events/123'>
                      <div className='card-media h-32'>
                        <Image width={500} height={500} src='/images/events/img-3.jpg' alt='' />
                        <div className='card-overlay'></div>
                      </div>
                    </Link>
                    <div className='card-body'>
                      <p className='text-xs font-medium text-black dark:text-red-600 mb-1'>
                        WED JUL 10,2024 AT 10PM
                      </p>
                      <Link href='/events/123'>
                        <h4 className='card-title text-sm'> About Safety and Flight </h4>
                      </Link>
                      <Link href=''>
                        <p className='card-text text-black mt-2'> Dubai </p>
                      </Link>
                      <div className='card-list-info text-xs mt-1'>
                        <div> 26 {t('Interested')}</div>
                        <div className='md:block hidden'>·</div>
                        <div> 8 {t('Going')}</div>
                      </div>
                      <div className='flex gap-2'>
                        <button
                          type='button'
                          className='button bg-blue-1 hover:bg-blue-2 duration-300 text-white flex-1'>
                          {t('Interested')}
                        </button>
                        <button
                          type='button'
                          className='button bg-foreground-2 hover:bg-hover-2 duration-300 !w-auto'>
                          <IoArrowRedo className='text-lg' />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className='card'>
                    <Link href='/events/123'>
                      <div className='card-media h-32'>
                        <Image width={500} height={500} src='/images/events/img-4.jpg' alt='' />
                        <div className='card-overlay'></div>
                      </div>
                    </Link>
                    <div className='card-body'>
                      <p className='text-xs font-semibold text-teal-600 mb-1'>{t('Opening')}</p>
                      <Link href='/events/123'>
                        <h4 className='card-title text-sm'> Perspective is everything </h4>
                      </Link>
                      <Link href=''>
                        <p className='card-text text-black mt-2'> London </p>
                      </Link>
                      <div className='card-list-info text-xs mt-1'>
                        <div> 20 {t('Interested')}</div>
                        <div className='md:block hidden'>·</div>
                        <div> 16 {t('Going')}</div>
                      </div>
                      <div className='flex gap-2'>
                        <button
                          type='button'
                          className='button bg-blue-1 hover:bg-blue-2 duration-300 text-white flex-1'>
                          {t('Interested')}
                        </button>
                        <button
                          type='button'
                          className='button bg-foreground-2 hover:bg-hover-2 duration-300 !w-auto'>
                          <IoArrowRedo className='text-lg' />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </main>
      </div>
    </div>
  );
}
