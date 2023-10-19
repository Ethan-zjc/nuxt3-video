<template>
    <div>
        <div class="container">
            <!-- 用于 seo 标题 描述    -->

            <Head>
                <Title>最新{{ info.data.name }}在线观看</Title>
                <Meta name="description" :content="`最新最全的${info.data.name}在线观看尽在淳渔影视。`" />
            </Head>

            <el-row :gutter="20" class="mt-20" v-for="categoryItem in res.data">
                <el-col :sm="18">
                    <div class="panel_hd between items-center">
                        <div class="panel_hd__left">
                            <h3 class="title items-center">
                                <i class="icon-movie-box"></i>
                                <a href="/">最新{{ categoryItem.name }}</a>
                            </h3>
                        </div>
                        <div class="panel_hd__right items-center">
                            <ul class="items-center">
                                <li>
                                    <nuxt-link :to="`/column/${route.params.column}/show?t=${categoryItem.name}`"
                                        class="items-center">
                                        更多 <el-icon>
                                            <ElIconArrowRight />
                                        </el-icon>
                                    </nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="video-list">
                        <el-row :gutter="20">
                            <el-col :sm="4" :xs="8" v-for="item in categoryItem.rows">
                                <div class="video-list__block">
                                    <nuxt-link :to="`/column/${item.columnValue}/${item.id}`" class="img-box">
                                        <el-image lazy class="video-list__block__img" :src="item.poster" fit="cover" />
                                        <span v-if="item.movieRate">{{ +item.movieRate.rate === 0 ? '暂无评分' :
                                            item.movieRate.rate.toFixed(1) }}</span>
                                    </nuxt-link>
                                    <div class="video-list__detail">
                                        <h4 class="title text-overflow">{{ item.title }}</h4>
                                        <p class="text-overflow">
                                            <template v-for="actor in item.casts">
                                                {{ actor.actor.name }}&nbsp;
                                            </template>
                                        </p>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :sm="6" class="hidden-sm-and-down">
                    <Ranking :title="`${ categoryItem.name }榜单`" :list="categoryItem.ranks"></Ranking>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
  
<script setup>
  const route = useRoute()
  const columnValue = route.params.column
  
  const [{data: res}, { data: info }] = await Promise.all([
    // 获取当前栏目下的所有类型数据
    useServerRequest( `web/type/${columnValue}`),
    // 获取当前栏目的信息
    useServerRequest(`column?value=${columnValue}`)
  ])
  
  // 如果未找到栏目数据就返回404页面
  if (!info.value.data) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found+99',
      fatal: true
    })
  }
  </script>
  