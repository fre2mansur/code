<?php /* Template Name: OurProjects */

$categories = get_categories( array(
    'orderby' => 'name',
    'order'   => 'ASC'
) );

$args = array(
  'post_type'   => 'post'
);
$post_date = array();
$posts = get_posts( $args );
foreach ( $posts as $post ) {
  $post_date[] = date('Y', strtotime($post->post_date));
} 
$unique_date = array_unique($post_date);
?>
 
<div class="ctm-portfolio">
  <div class="cat_filter">
    <div class="Cplaceholder">All</div>
    <ul class="filter">
     	<li data-id="all">All</li>
		<?php foreach( $categories as $category ) { ?>
		    <li data-id="<?php echo esc_html($category->name); ?>"><?php echo esc_html($category->name); ?></li>
		<?php } ?>
    </ul>
  </div>
  <div class="year_filter">
    <div class="Cplaceholder">All</div>
    <ul class="filter">
    <li data-year="all">All</li>
    <?php foreach($unique_date as $date) { ?>
       <li data-year="<?php echo $date; ?>"><?php echo $date; ?></li>
	<?php } ?>
    </ul> 
  </div>
</div>
<div id="ctm-portfolio-item"></div>