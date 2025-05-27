import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as t,c as d,a as e,b as n,d as s,e as i}from"./app-24a8d5b3.js";const r={},o=e("h2",{id:"介绍",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#介绍","aria-hidden":"true"},"#"),n(" 介绍")],-1),u=e("p",null,[e("strong",null,"J2Cache"),n(" 是 OSChina 研发的两级缓存框架。第一级缓存 L1 使用内存（同时支持 Ehcache 2.x、Ehcache 3.x 和 Caffeine），第二级缓存 L2 使用 Redis（推荐）/Memcached。我们知道像 Redis 此类远端缓存的性能瓶颈主要在于网络，因此 L1 的加入目标是降低对 L2 的读取次数。该缓存框架主要用于集群环境中，单机也可以使用，用于避免应用重启导致的缓存冷启动后对后端业务的冲击。")],-1),v={href:"https://gitee.com/ld/J2Cache",target:"_blank",rel:"noopener noreferrer"},p=i('<h2 id="实现背景" tabindex="-1"><a class="header-anchor" href="#实现背景" aria-hidden="true">#</a> 实现背景</h2><p>目前缓存的解决方案一般有两种：</p><ul><li><p>内存缓存（如 Ehcache）：速度快，进程内可用</p></li><li><p>集中式缓存（如 Redis）：可同时为多节点提供服务</p></li></ul><p>J2Cache 主要解决的问题如下：</p><ol><li><p>使用内存缓存时，一旦应用重启后，由于缓存数据丢失，缓存雪崩，给数据库造成巨大压力，导致应用堵塞</p></li><li><p>使用内存缓存时，多个应用节点无法共享缓存数据</p></li><li><p>使用集中式缓存，由于大量的数据通过缓存获取，导致缓存服务的数据吞吐量太大，带宽跑满。现象就是 Redis 服务负载不高，但是由于机器网卡带宽跑满，导致数据读取非常慢</p></li></ol><p>在遭遇 1、2 问题时，采用 Redis 此类分布式缓存就势必会带来问题 3 的发生（Redis 的瓶颈之一在于网络 IO），而针对问题 3 的处理一般会采用集群来降低缓存服务的（带宽）压力。可实际上，此时的分布式缓存可能数据量不大，仅仅是数据吞吐量大而已。</p><p>J2Cache 本身并非一个缓存框架，而是缓存框架的桥梁，利用现有优秀的内存缓存缓存（Caffeine、Ehcache）作为一级缓存，把 Redis/Memcache 作为二级缓存。所有数据的读取先从一级缓存中读取，不存在时再从二级缓存读取，这样来确保对二级缓存 Redis（远端缓存） 的访问次数降到最低。</p><p>而使用内存缓存导致的应用节点内存占用提升问题，对现在的企业（云）服务器配置而言不算有压力（动则几十 G 起步）。其次一级缓存框架可以通过配置控制在内存中存储的数据量，无需担心 OOM 问题。</p><h2 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h2><ul><li>在集群环境，使用 J2Cache 可以有效降低节点间的数据传输量</li><li>单节点使用 J2Cache 可以避免应用重启后对后端业务系统的冲击</li></ul><h2 id="region" tabindex="-1"><a class="header-anchor" href="#region" aria-hidden="true">#</a> Region</h2><p>在 Redis 中可以针对每一个 Key 来设置超时时间，但像 Java 的内存缓存框架（Ehcache、Caffeine、Guava Cache）是无法为每个 Key 设置不同的 TTL，因为这样管理起来非常复杂，而且在检查缓存数据是否失效时性能极差，所以一般内存缓存框架会把一组相同 TTL 策略的缓存数据放在一起进行管理，即 <strong>Region</strong>。</p><p>J2Cache 的 Region 来源于 Ehcache 的 Region 概念，而在 Caffeine、Guava Cache 中则是通过构建 Cache 对象来设置缓存的时间策略。</p><p>默认 Region 为 <code>default</code>，由于 J2Cache 默认使用 Caffeine 作为一级缓存，会在其 <code>caffeine.properties</code> 配置文件设置 Region，若保存数据时指定的 Region 在配置文件中不存在，则会自动创建，并且可缓存数量的大小和超时时间与 <code>default</code> 保持一致。</p><p>因此可以根据不同的业务场景来规划不同的 Region 来存放不同的数据。</p><h2 id="应用" tabindex="-1"><a class="header-anchor" href="#应用" aria-hidden="true">#</a> 应用</h2><h3 id="静态配置" tabindex="-1"><a class="header-anchor" href="#静态配置" aria-hidden="true">#</a> 静态配置</h3>',17),h={href:"https://gitee.com/ld/J2Cache/tree/master#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95",target:"_blank",rel:"noopener noreferrer"},m=e("code",null,"/resources",-1),b=e("code",null,"caffeine.properties",-1),C=e("code",null,"j2cache.properties",-1),k=i(`<div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token comment">####### caffeine.properties</span>

<span class="token comment"># region 名称 = region 可缓存的数量，有效期（s|m|h|d）</span>
<span class="token key attr-name">default</span> <span class="token punctuation">=</span> <span class="token value attr-value">1000, 30m</span>
<span class="token key attr-name">custom</span> <span class="token punctuation">=</span> <span class="token value attr-value">500, 20m</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token comment">####### j2cache.properties</span>

<span class="token comment"># 这里选择了 Redis lettuce 连接方式，PS：lettuce 是基于 Netty 构建的连接，支持同步异步调用，多个线程可共享同一个 RedisConnection</span>
<span class="token comment"># 但在此与 Jedis 相比没区别，都是通过 Redis pun/sub 来实现广播，其它广播方式看配置文件即可</span>
<span class="token key attr-name">j2cache.broadcast</span> <span class="token punctuation">=</span> <span class="token value attr-value">lettuce</span>

<span class="token comment"># 1、2 缓存实现类名称，CacheChannel 初始化时会通过名称去获取两级缓存的 CacheProvider 实现</span>
<span class="token key attr-name">j2cache.L1.provider_class</span> <span class="token punctuation">=</span> <span class="token value attr-value">caffeine</span>
<span class="token key attr-name">j2cache.L2.provider_class</span> <span class="token punctuation">=</span> <span class="token value attr-value">lettuce</span>
<span class="token comment"># 此处要注意：broadcast 选择了 lettuce 后，此处的 L2.provider_class 得保持一致，否则在配置 pubsub 时，会因为取不到连接而抛出 NPE</span>
<span class="token comment"># 这是因为二级缓存、广播两者都会创建相应的 CacheProvider，但前者会调用其 start 方法创建连接，而后者仅仅是 new 了个对象并保存了二级缓存的 holder，执行 pubsub 时是取的自身建立的连接，但由于广播操作的 cacheProvider 没有进行 start 自然就不会有连接。  </span>

<span class="token comment"># 设置 Redis key 是否有过期时间，默认 true，false 则 key 永不过期</span>
<span class="token key attr-name">j2cache.sync_ttl_to_redis</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span>
<span class="token comment"># 默认情况下是否缓存 null 对象，默认 false</span>
<span class="token key attr-name">j2cache.default_cache_null_object</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span>
<span class="token comment"># 缓存序列化方式，有多种：fst（官方推荐）、kryo、fastjson、java、fse</span>
<span class="token key attr-name">j2cache.serialization</span> <span class="token punctuation">=</span> <span class="token value attr-value">json</span>

<span class="token comment"># Redis 配置，默认采用 jedis，如果时使用 lettuce，则会有前缀为 luttuce 的相同设置参数，想看配置文件即可</span>
<span class="token comment"># 单节点，可填：sentinel、cluster、sharded</span>
<span class="token key attr-name">redis.mode</span> <span class="token punctuation">=</span> <span class="token value attr-value">single</span>
<span class="token comment"># redis 存储模式，分为 generic、hash，使用 hash 模式，会导致 sync_ttl_to_redis 无效，因为 hash 存储结构不能为单独的属性（KV）设置过期时间</span>
<span class="token key attr-name">redis.storage</span> <span class="token punctuation">=</span> <span class="token value attr-value">generic</span>
<span class="token comment"># redis pub/sub channel 名称</span>
<span class="token key attr-name">redis.channel</span> <span class="token punctuation">=</span> <span class="token value attr-value">j2cache</span>
<span class="token comment"># redis pub/sub server 地址，为空则与 hosts 相同</span>
<span class="token key attr-name">redis.channel.host</span> <span class="token value attr-value">=</span>
<span class="token key attr-name">redis.hosts</span> <span class="token punctuation">=</span> <span class="token value attr-value">127.0.0.1:6379</span>
<span class="token key attr-name">redis.timeout</span> <span class="token punctuation">=</span> <span class="token value attr-value">2000</span>
<span class="token key attr-name">redis.password</span> <span class="token punctuation">=</span> <span class="token value attr-value">123456</span>
<span class="token key attr-name">redis.database</span> <span class="token punctuation">=</span> <span class="token value attr-value">0</span>
<span class="token key attr-name">redis.ssl</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>静态配置的使用需要在代码中手动使用 J2Cache 对象去获取 CacheChannel</li></ul><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>public class Config {
  
  private final static cacheChannel = null;
  
  /**
   * 以下代码是随便写写，主要知道 CacheChannel 从何而来以及静态配置如何生效即可
   */
  static {
    cacheChannel = J2Cache.getChannel();
  }
  
  public CacheChannel getChannel() {
    return this.cacheChannel;
  }
  
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="动态配置" tabindex="-1"><a class="header-anchor" href="#动态配置" aria-hidden="true">#</a> 动态配置</h3><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@Configuration
public class CacheConfig {
    
    @Bean(&quot;cacheChannel&quot;)
    public CacheChannel init() {
        // 这个 config 的信息配置都是 Properties 方式，具体的参数可以参考 getChannel() 方法执行流程所取的字段
        // 而缓存本身的配置字段，如 host、password 等则可参考配置文件去填写即可
        J2CacheConfig config = new J2CacheConfig();
        //填充 config 变量所需的配置信息
        J2CacheBuilder builder = J2CacheBuilder.init(config);
        CacheChannel channel = builder.getChannel();
        return channel;
        
        // close 操作就是断开（boardcast）集群连接、清空一、二级缓存的内存数据、断开二级缓存的连接
        // channel.close();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例" aria-hidden="true">#</a> 代码示例</h3><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@RestController
@RequestMapping(&quot;/demo&quot;)
public class DemoController{
    
    @Resource
    private CacheChannel cache
    
    /**
     * 静态配置与动态配置读取
     */
    @GetMapping(&quot;/source&quot;)
    public void source(){
        // 这一段的配置是指使用 j2cache.properties 的配置初始化 CacheChannel，也就是静态配置
        // 而若配置了 CacheConfig 动态配置，由 SpringBoot 动态加载注入，那么 j2cache.properties 的配置就不会去读取了
        CacheChannel channel = J2Cache.getChannel();
        channel.set(CacheNameConstant.DEFAULT, &quot;GUEST&quot;, &quot;3288&quot;);
        System.out.println(channel.get(CacheNameConstant.DEFAULT, &quot;GUEST&quot;));
    }
        
    @GetMapping
    public void test() {
        // 缓存操作，region - key - value，保存到一二级缓存
        cache.set(&quot;default&quot;, &quot;1&quot;, &quot;Hello J2Cache&quot;);
        System.out.println(&quot;============&quot; + cache.get(&quot;default&quot;, &quot;1&quot;));
        // 清除操作，region - key，会将一二级缓存该数据都删掉
        cache.evict(&quot;default&quot;, &quot;1&quot;);
        System.out.println(&quot;============&quot; + cache.get(&quot;default&quot;, &quot;1&quot;));
    }
    
    /**
     * 手动构建 Command 对象发布更新通知
     */
    @GetMapping(&quot;/publish&quot;)
    public void publish(){
        // Command 是 J2Cache 内部对象，使用 Redis 发布通知，便是包装该对象后，订阅者接收进行解析从而确定执行的命令
        LettuceCacheProvider l2Provider = (LettuceCacheProvider) cache.getL2Provider();
        Command cmd = new Command();
        String[] a = new String[1];
        a[0] = &quot;USER&quot;;
        cmd.setKeys(a);
        // Operator 有四种，详看 Command 对象定义
        cmd.setOperator(2);
        cmd.setRegion(&quot;default&quot;);
        // 发布后的被订阅者接收只会清除一级缓存，因为在 J2Cache 内部发起通知都是因为二级缓存（Redis）被修改
        // 所以只需要清除一级缓存即可
        l2Provider.publish(cmd);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实现原理" tabindex="-1"><a class="header-anchor" href="#实现原理" aria-hidden="true">#</a> 实现原理</h2><p>以 Caffeine / Redis 更新数据为例，实现思路如下：</p><ol><li><p>当 set 更新时，会调用 publish 方法，初始化一个 Command 对象，该对象保存了 Region、keys、操作标识（1-加入集群，2-删除缓存，3-清空缓存，4-退出集群），然后发给指定的 Channel</p></li><li><p>而订阅 Channel 的一方收到消息后，会解析 Command 对象，由于 set 的命令操作标识为 2，因为会根据 Region、keys 删除本地缓存，待下次读取数据时，则会从二级缓存获取最新数据</p></li></ol><p>纵观下来，整体思路其实就是 L1 在更新数据后，将数据同步到 L2，并发送通知给到其它节点，其它节点直接删除 L1 缓存，下次从 L2 读取数据并更新至 L1。</p><p>J2Cache 支持的节点间数据同步方案除了 Redis 外还包括以下几种，各种方案在 <code>j2cache.properties</code> 都可看到描述信息：</p><ul><li><p>Redis（lettuce） Pub/Sub</p></li><li><p>JGroups</p></li><li><p>RabbitMQ</p></li><li><p>RocketMQ</p></li><li><p>自定义实现，需实现 <code>net.oschina.j2cache.cluster.ClusterPolicy</code> 接口</p></li></ul><p>J2Cache 并不复杂，追踪源码后很快就能理解。</p><h2 id="小故事" tabindex="-1"><a class="header-anchor" href="#小故事" aria-hidden="true">#</a> 小故事</h2><p>还记得第一次学习 Redis 后，了解到存在与 MySQL 数据库的数据同步问题时，我就想过 JVM 内存与 Redis 缓存是否也可存在此种做法，优先访问 JVM 内存，次之是远端缓存 Redis。但当时对缓存概念理解浅薄，认为收益不大，便未深入研究。如今在公司看到其它系统项目引入 J2Cache，又勾起了我的兴趣。查看了 J2Cache 官方仓库后，发现它早于我最初构想时就已存在。然而，J2Cache 似乎并不活跃，虽然有 3.x 版本的开发计划，但最近一次版本更新还是两年前的 2.8.4。</p>`,17),g={href:"https://github.com/alibaba/jetcache/tree/master",target:"_blank",rel:"noopener noreferrer"},f={href:"https://my.oschina.net/javayou/blog/2988523",target:"_blank",rel:"noopener noreferrer"};function J(_,q){const a=c("ExternalLinkIcon");return t(),d("div",null,[o,u,e("blockquote",null,[e("p",null,[n("官方仓库："),e("a",v,[n("https://gitee.com/ld/J2Cache"),s(a)])])]),p,e("ul",null,[e("li",null,[n("基础使用看仓库 "),e("a",h,[n("README.md"),s(a)]),n(" 即可，这里以 Caffeine、Redis 为例，先从代码仓库 "),m,n(" 中拷贝 "),b,n("、"),C,n("，后者是 J2Cache 核心配置，主要包含了 1、2 级缓存的连接配置、缓存广播信息等。")])]),k,e("p",null,[n("而且 J2Cache 官方还提到了它与 "),e("a",g,[n("JetCache"),s(a)]),n(" 的区别（"),e("a",f,[n("原文戳此"),s(a)]),n("）。JetCache 是阿里开源的一款缓存框架，旨在对 Java 缓存进行抽象，为不同缓存解决方案提供统一的使用方式。J2Cache 解释 JetCache 是对缓存设计的封装，而 J2Cache 则是全新的两级缓存框架。然而在查看了下 JetCache 官方仓库，其实 JetCache 也已提供二级缓存功能了。因此，与 JetCache 相比，J2Cache 的特点便不复存在，逐渐变得不活跃也就不足为奇了。")])])}const x=l(r,[["render",J],["__file","J2Cache.html.vue"]]);export{x as default};
